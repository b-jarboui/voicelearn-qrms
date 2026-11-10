# Generate narration for chapter.js with Gemini TTS, convert to MP3, and write timings.js.
# - Only the narration text is sent (no style instructions: TTS models read instructions aloud).
# - The API key is read from %USERPROFILE%\.gemini_api_key; it is never printed or written to this folder.
# - Free tier: 10 requests per model per day. -Merge joins short scenes into one request; the clip is then cut
#   at the first sentence of the next scene, found by the Windows speech recogniser.
# - Raw audio is cached in %TEMP%\w11tts\<model>\<unit>.pcm; re-runs reuse it unless -Force.
# Usage: tts_gemini.ps1 [-Model gemini-2.5-pro-preview-tts] [-Voice Charon] [-Merge "s01+s02","s06+s07"] [-Only s03] [-Force]
param([string[]]$Only = @(), [string]$Voice = "Charon", [string]$Model = "gemini-2.5-pro-preview-tts",
      [string[]]$Merge = @("s01+s02", "s06+s07"), [switch]$Force)
$ErrorActionPreference = "Stop"
$root   = Split-Path $PSScriptRoot -Parent
$ffmpeg = "$env:USERPROFILE\HBMSU Course Agents\business-process-management\voicelearn\video\tools\ffmpeg-9.0.2-essentials_build\bin\ffmpeg.exe"
$key    = ([IO.File]::ReadAllText("$env:USERPROFILE\.gemini_api_key")).Trim()
$audio  = Join-Path $root "audio"; New-Item -ItemType Directory -Force $audio | Out-Null
$tmp    = Join-Path $env:TEMP "w11tts\$Model"; New-Item -ItemType Directory -Force $tmp | Out-Null

# --- scenes from chapter.js; a quiz scene is split into a (question) and b (answers, played after the student answers)
$js = [IO.File]::ReadAllText((Join-Path $root "chapter.js"), [Text.Encoding]::UTF8)
$scenes = [ordered]@{}
foreach ($m in [regex]::Matches($js, '\{ id: "(s\d+)"(.*?)lines: \[(.*?)\]\}', 'Singleline')) {
  $id = $m.Groups[1].Value; $lines = @([regex]::Matches($m.Groups[3].Value, '"((?:[^"\\]|\\.)*)"') | % { $_.Groups[1].Value })
  $opt = $m.Groups[2].Value; $split = if ($opt -match 'split: (\d+)') { [int]$Matches[1] } elseif ($opt -match 'quiz: true') { 1 } else { 0 }
  if ($split -gt 0) { $scenes["${id}a"] = @($lines[0..($split-1)]); $scenes["${id}b"] = @($lines[$split..($lines.Count-1)]) }
  else { $scenes[$id] = $lines }
}
# --- request units (merged or single)
$units = @(); $taken = @{}
foreach ($g in $Merge) { $ids = $g -split '\+'; $units += ,@($ids); $ids | % { $taken[$_] = 1 } }
foreach ($id in $scenes.Keys) { if (-not $taken[$id]) { $units += ,@($id) } }
$units = $units | Sort-Object { $_[0] }

function Speak($text) {
  $body = @{ contents = @(@{ parts = @(@{ text = $text }) }); generationConfig = @{ responseModalities = @("AUDIO"); speechConfig = @{ voiceConfig = @{ prebuiltVoiceConfig = @{ voiceName = $Voice } } } } } | ConvertTo-Json -Depth 10
  $uri = "https://generativelanguage.googleapis.com/v1beta/models/${Model}:generateContent"
  for ($try = 1; $try -le 3; $try++) {
    try {
      $r = Invoke-RestMethod -Method Post -Uri $uri -Headers @{ 'x-goog-api-key' = $key } -ContentType "application/json; charset=utf-8" -Body ([Text.Encoding]::UTF8.GetBytes($body)) -TimeoutSec 240
      $d = $r.candidates[0].content.parts[0].inlineData.data
      if ($d) { return ,[Convert]::FromBase64String($d) }
      Write-Host "  no audio in response"
    } catch {
      $code = try { [int]$_.Exception.Response.StatusCode } catch { 0 }
      Write-Host "  try $try failed ($code)"; if ($code -eq 429) { throw "daily quota reached for $Model" }
      Start-Sleep -Seconds (10 * $try)
    }
  }
  throw "TTS failed"
}
function Pauses($file) {
  $log = cmd /c "`"$ffmpeg`" -hide_banner -i `"$file`" -af silencedetect=noise=-38dB:d=0.25 -f null - 2>&1" | Out-String
  $dur = [double]([regex]::Matches($log, 'time=(\d+):(\d+):([\d\.]+)') | Select -Last 1 | % { [int]$_.Groups[1].Value*3600 + [int]$_.Groups[2].Value*60 + [double]$_.Groups[3].Value })
  $sil = @([regex]::Matches($log, 'silence_end: ([\d\.]+) \| silence_duration: ([\d\.]+)') | % { [pscustomobject]@{ e = [double]$_.Groups[1].Value; d = [double]$_.Groups[2].Value } } | ? { $_.e -gt 0.5 -and $_.e -lt $dur - 0.3 })
  return @{ dur = $dur; sil = $sil }
}
# sentence starts: Windows recogniser first; if a sentence is not recognised, estimate from text length and the longest nearby pause
function Cues($file, $lines) {
  $p = Pauses $file; $dur = $p.dur; $sil = $p.sil
  $w16 = "$file.16k.wav"; & $ffmpeg -y -loglevel error -i $file -ar 16000 -ac 1 $w16
  $ao = @(& (Join-Path $PSScriptRoot "align_local.ps1") -Wav $w16 -Lines $lines); Remove-Item $w16
  $rec = @($ao | ? { $_ -notlike '#*' } | % { [double]$_ }); $script:coverage = ($ao | ? { $_ -like '#coverage=*' }) -replace '#coverage=', ''
  $lens = $lines | % { $_.Length }; $total = ($lens | Measure-Object -Sum).Sum
  $speech = $dur - (($sil | Measure-Object d -Sum).Sum)
  $cues = @(0.0); $acc = 0; $last = 0.0; $miss = @()
  for ($i = 1; $i -lt $lines.Count; $i++) {
    $acc += $lens[$i-1]; $clock = $speech * $acc / $total
    foreach ($s in ($sil | Sort-Object e)) { if ($s.e - $s.d -lt $clock) { $clock += $s.d } }
    if ($rec[$i] -ge 0) {
      $c = $sil | ? { $_.e -gt $rec[$i] - 0.9 -and $_.e -lt $rec[$i] + 0.5 } | Sort-Object { [math]::Abs($_.e - $rec[$i]) } | Select -First 1
      $st = if ($c) { $c.e } else { $rec[$i] }
    } else {
      $win = [math]::Max(3.0, 0.12 * $dur)
      $c = $sil | ? { $_.e -gt $last + 1.0 -and [math]::Abs($_.e - $clock) -lt $win } | Sort-Object { -($_.d - 0.05 * [math]::Abs($_.e - $clock)) } | Select -First 1
      $st = if ($c) { $c.e } else { $clock }; $miss += ($i + 1)
    }
    $last = $st; $cues += [math]::Round([math]::Max(0.0, $st - 0.1), 2)
  }
  return @{ dur = $dur; cues = $cues; miss = $miss }
}

$timings = [ordered]@{}
$tf = Join-Path $root "timings.js"
if (Test-Path $tf) { ([IO.File]::ReadAllText($tf) -replace '^window\.TIMINGS = ', '' -replace ';\s*$', '' | ConvertFrom-Json).PSObject.Properties | % { $timings[$_.Name] = $_.Value } }

foreach ($u in $units) {
  $uid = $u -join '+'
  if ($Only.Count -and -not ($u | ? { $Only -contains $_ -or $Only -contains $_.Substring(0,3) })) { continue }
  $lines = @(); $u | % { $lines += $scenes[$_] }
  $pcm = Join-Path $tmp "$uid.pcm"
  if ($Force -or -not (Test-Path $pcm)) { "speaking $uid ($($lines.Count) sentences) with $Model"; [IO.File]::WriteAllBytes($pcm, (Speak ($lines -join " "))) } else { "reusing $uid" }
  $full = Join-Path $tmp "$uid.mp3"
  & $ffmpeg -y -loglevel error -f s16le -ar 24000 -ac 1 -i $pcm -af "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,apad=pad_dur=0.4,atempo=0.94,loudnorm=I=-16:TP=-1.5:LRA=11" -ar 24000 -ac 1 -c:a libmp3lame -b:a 64k $full
  $c = Cues $full $lines
  # cut a merged clip into its scenes
  $k = 0; $parts = @()
  for ($j = 0; $j -lt $u.Count; $j++) { $parts += @{ id = $u[$j]; first = $k; n = $scenes[$u[$j]].Count }; $k += $scenes[$u[$j]].Count }
  foreach ($p in $parts) {
    $t0 = if ($p.first -eq 0) { 0.0 } else { [math]::Max(0.0, $c.cues[$p.first] - 0.05) }
    $t1 = if ($p.first + $p.n -lt $lines.Count) { $c.cues[$p.first + $p.n] - 0.05 } else { $c.dur }
    $out = Join-Path $audio "$($p.id).mp3"
    if ($u.Count -eq 1) { Copy-Item $full $out -Force } else { & $ffmpeg -y -loglevel error -i $full -ss $t0 -to $t1 -af "apad=pad_dur=0.3" -c:a libmp3lame -b:a 64k $out }
    $pc = @(); for ($i = 0; $i -lt $p.n; $i++) { $pc += [math]::Round([math]::Max(0.0, $c.cues[$p.first + $i] - $t0), 2) }; $pc[0] = 0.0
    $timings[$p.id] = [ordered]@{ file = "audio/$($p.id).mp3"; dur = [math]::Round($t1 - $t0 + 0.3, 2); cues = $pc }
    "  $($p.id): $([math]::Round($t1 - $t0,1)) s, cues: $($pc -join ', ')"
  }
  "  recogniser heard $([math]::Round(100 * [double]$script:coverage))% of the script words" + $(if ($c.miss.Count) { "; estimated: sentence $($c.miss -join ',') of $uid" } else { "" })
}
[IO.File]::WriteAllText($tf, "window.TIMINGS = " + ($timings | ConvertTo-Json -Depth 5 -Compress) + ";", (New-Object Text.UTF8Encoding($false)))
"done"
