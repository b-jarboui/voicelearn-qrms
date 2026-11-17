# Local sentence alignment with the Windows speech recogniser (no API, no quota).
# 1) The audio is cut at its pauses into short chunks; each chunk is recognised on its own, so word times do not drift.
# 2) The script words and the recognised words are matched with a longest-common-subsequence alignment.
# 3) A sentence starts at the time of its first matched word, minus about 0.3 s for each unmatched word before it.
# Prints one start time per sentence (-1 = no match in that sentence), then "#coverage=<share of script words matched>".
param([string]$Wav, [string[]]$Lines)
$ff = "$env:USERPROFILE\HBMSU Course Agents\business-process-management\voicelearn\video\tools\ffmpeg-9.0.2-essentials_build\bin\ffmpeg.exe"
Add-Type -AssemblyName System.Speech
$log = cmd /c "`"$ff`" -hide_banner -i `"$Wav`" -af silencedetect=noise=-38dB:d=0.22 -f null - 2>&1" | Out-String
$dur = [double]([regex]::Matches($log, 'time=(\d+):(\d+):([\d\.]+)') | Select -Last 1 | % { [int]$_.Groups[1].Value*3600 + [int]$_.Groups[2].Value*60 + [double]$_.Groups[3].Value })
$ends = @([regex]::Matches($log, 'silence_end: ([\d\.]+) \| silence_duration: ([\d\.]+)') | % { [pscustomobject]@{ s = [double]$_.Groups[1].Value - [double]$_.Groups[2].Value; e = [double]$_.Groups[1].Value } })
# chunk boundaries: middle of each pause; merge chunks shorter than 2.5 s with the next one
$cuts = @(0.0); foreach ($p in $ends) { $m = ($p.s + $p.e) / 2; if ($m - $cuts[-1] -ge 2.5 -and $dur - $m -ge 1.0) { $cuts += $m } }; $cuts += $dur
$hw = New-Object System.Collections.Generic.List[string]; $ht = New-Object System.Collections.Generic.List[double]
for ($c = 0; $c -lt $cuts.Count - 1; $c++) {
  $t0 = $cuts[$c]; $t1 = $cuts[$c + 1]; $cw = "$Wav.c$c.wav"
  & $ff -y -loglevel error -i $Wav -ss $t0 -to $t1 -ar 16000 -ac 1 $cw
  $eng = New-Object System.Speech.Recognition.SpeechRecognitionEngine (New-Object Globalization.CultureInfo "en-US")
  $eng.LoadGrammar((New-Object System.Speech.Recognition.DictationGrammar)); $eng.SetInputToWaveFile($cw)
  for ($n = 0; $n -lt 40; $n++) {
    try { $r = $eng.Recognize() } catch { break }; if ($null -eq $r) { break }
    foreach ($w in $r.Words) { $a = $r.GetAudioForWordRange($w, $w); foreach ($x in (($w.Text.ToLower() -replace "[^a-z0-9' ]", ' ') -split '\s+' | ? { $_ })) { $hw.Add($x); $ht.Add($t0 + $a.AudioPosition.TotalSeconds) } }
  }
  $eng.Dispose(); Remove-Item $cw
}
# script words with their sentence index
$sw = New-Object System.Collections.Generic.List[string]; $ss = New-Object System.Collections.Generic.List[int]
for ($i = 0; $i -lt $Lines.Count; $i++) { foreach ($x in (($Lines[$i].ToLower() -replace "[^a-z0-9' ]", ' ') -split '\s+' | ? { $_ })) { $sw.Add($x); $ss.Add($i) } }
$m = $sw.Count; $k = $hw.Count
$W = $k + 1; $L = New-Object 'int[]' (($m + 1) * $W)
for ($i = $m - 1; $i -ge 0; $i--) { for ($j = $k - 1; $j -ge 0; $j--) {
  if ($sw[$i] -eq $hw[$j]) { $L[$i*$W+$j] = $L[($i+1)*$W+$j+1] + 1 }
  else { $a1 = $L[($i+1)*$W+$j]; $a2 = $L[$i*$W+$j+1]; $L[$i*$W+$j] = if ($a1 -ge $a2) { $a1 } else { $a2 } } } }
$match = @{}; $i = 0; $j = 0
while ($i -lt $m -and $j -lt $k) { if ($sw[$i] -eq $hw[$j]) { $match[$i] = $j; $i++; $j++ } elseif ($L[($i+1)*$W+$j] -ge $L[$i*$W+$j+1]) { $i++ } else { $j++ } }
$out = @()
for ($s = 0; $s -lt $Lines.Count; $s++) {
  if ($s -eq 0) { $out += 0.0; continue }
  $first = $ss.IndexOf($s); $t = -1
  for ($q = $first; $q -lt $m -and $ss[$q] -eq $s; $q++) { if ($match.ContainsKey($q)) { $t = [math]::Round([math]::Max(0.0, $ht[$match[$q]] - 0.3 * ($q - $first)), 2); break } }
  $out += $t
}
$out
"#coverage=" + [math]::Round($match.Count / [math]::Max(1, $m), 2)
