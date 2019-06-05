param(
    [string]$firebaseToken,
    [string]$firebaseProject,
    [string]$releaseMessage
)

Write-Host firebaseToken parameter: $firebaseToken
Write-Host firebaseProject parameter: $firebaseProject
Write-Host releaseMessage parameter: $releaseMessage

$dir = Split-Path $MyInvocation.MyCommand.Path
Push-Location $dir

Write-Host "installing Firebase tools..."
npm i -g firebase-tools
Write-Host "starting deployment..."
firebase deploy --token "'$firebaseToken'" --project "'$firebaseProject'" --message "'$releaseMessage'"
Write-Host "deployment completed"

Pop-Location