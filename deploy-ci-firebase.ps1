param(
    [string]$firebaseToken,
    [string]$firebaseProject,
    [string]$releaseMessage
)

$dir = Split-Path $MyInvocation.MyCommand.Path
Push-Location $dir

Write-Host "installing Firebase tools..."
npm i -g firebase-tools
Write-Host "starting deployment..."
firebase deploy --token "'$fireBaseToken'" --project "'$fireBaseProject'" --message "'$releaseMessage'"
Write-Host "deployment completed"

Pop-Location