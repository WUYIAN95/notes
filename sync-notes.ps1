$ErrorActionPreference = 'Stop'

if (-not $env:YUQUE_TOKEN) {
  if (Test-Path -LiteralPath '.elog.env') {
    Get-Content -LiteralPath '.elog.env' | ForEach-Object {
      if ($_ -match '^\s*YUQUE_TOKEN\s*=\s*(.+?)\s*$') {
        $env:YUQUE_TOKEN = $Matches[1].Trim().Trim('"', "'")
      }
    }
  }
}

if (-not $env:YUQUE_TOKEN) {
  throw 'YUQUE_TOKEN is not set. Copy .elog.env.example to .elog.env and add your Yuque token.'
}

node ./node_modules/@elog/cli/bin/elog.js sync -c elog.games.config.js -e .elog.env --force
Start-Sleep -Seconds 5
node ./node_modules/@elog/cli/bin/elog.js sync -c elog.software.config.js -e .elog.env --force

if ((git status --porcelain)) {
  git add games software package.json package-lock.json elog.games.config.js elog.software.config.js sync-notes.ps1 .elog.env.example .gitignore
  git commit -m "Sync Yuque knowledge bases"
  git push origin main
} else {
  Write-Host 'No document changes to push.'
}
