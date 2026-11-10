# Minimal static file server for local previews: serve.ps1 [-Port 8811]
param([int]$Port = 8811)
$root = Split-Path $PSScriptRoot -Parent
$l = New-Object Net.HttpListener; $l.Prefixes.Add("http://localhost:$Port/"); $l.Start()
Write-Host "serving $root on http://localhost:$Port/"
$types = @{ ".html" = "text/html; charset=utf-8"; ".js" = "text/javascript; charset=utf-8"; ".css" = "text/css"; ".mp3" = "audio/mpeg"; ".png" = "image/png"; ".svg" = "image/svg+xml"; ".json" = "application/json" }
while ($l.IsListening) {
  $c = $l.GetContext(); $p = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart('/')); if (-not $p) { $p = "index.html" }
  $f = Join-Path $root $p
  if ((Test-Path $f -PathType Leaf) -and ([IO.Path]::GetFullPath($f).StartsWith($root))) {
    $b = [IO.File]::ReadAllBytes($f); $c.Response.ContentType = $types[[IO.Path]::GetExtension($f)]
    $c.Response.Headers.Add("Accept-Ranges", "bytes"); $c.Response.ContentLength64 = $b.Length; $c.Response.OutputStream.Write($b, 0, $b.Length)
  } else { $c.Response.StatusCode = 404 }
  $c.Response.Close()
}
