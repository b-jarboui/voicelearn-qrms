# Local sentence alignment with the Windows speech recogniser (no API, no quota).
# 1) Dictation gives recognised words with times (phrase starts chained to absolute time).
# 2) The script words and the recognised words are matched with a longest-common-subsequence alignment.
# 3) A sentence starts at the time of its first matched word, minus about 0.3 s for each unmatched word before it.
# Prints one start time per sentence (-1 = no match in that sentence), then "#coverage=<share of script words matched>".
param([string]$Wav, [string[]]$Lines)
Add-Type -AssemblyName System.Speech
$eng = New-Object System.Speech.Recognition.SpeechRecognitionEngine (New-Object Globalization.CultureInfo "en-US")
$eng.LoadGrammar((New-Object System.Speech.Recognition.DictationGrammar))
$eng.SetInputToWaveFile($Wav)
$hw = New-Object System.Collections.Generic.List[string]; $ht = New-Object System.Collections.Generic.List[double]; $base = 0.0
for ($n = 0; $n -lt 300; $n++) {
  try { $r = $eng.Recognize() } catch { break }
  if ($null -eq $r) { break }
  $start = $base + $r.Audio.AudioPosition.TotalSeconds
  foreach ($w in $r.Words) { $a = $r.GetAudioForWordRange($w, $w); $hw.Add(($w.Text.ToLower() -replace "[^a-z0-9']", '')); $ht.Add($start + $a.AudioPosition.TotalSeconds) }
  $base = $start + $r.Audio.Duration.TotalSeconds
}
$eng.Dispose()
# script words with their sentence index
$sw = New-Object System.Collections.Generic.List[string]; $ss = New-Object System.Collections.Generic.List[int]
for ($i = 0; $i -lt $Lines.Count; $i++) { foreach ($x in (($Lines[$i].ToLower() -replace "[^a-z0-9' ]", ' ') -split '\s+' | ? { $_ })) { $sw.Add($x); $ss.Add($i) } }
$m = $sw.Count; $k = $hw.Count
$W = $k + 1; $L = New-Object 'int[]' (($m + 1) * $W)   # L[i*W+j] = LCS length of sw[i..] and hw[j..]
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
