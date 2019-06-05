param(
    [string]$firebaseToken,
    [string]$firebaseProject,
    [string]$releaseMessage
)

Write-Host firebaseToken parameter: $firebaseToken
Write-Host firebaseProject parameter: $firebaseProject
Write-Host releaseMessage parameter: $releaseMessage

Write-Host FIREBASE_AUTH_TOKEN env: $env:FIREBASE_AUTH_TOKEN
Write-Host FIREBASE_PROJECT env: $env:FIREBASE_PROJECT
Write-Host RELEASE_RELEASEWEBURL env: $env:RELEASE_RELEASEWEBURL

$token = "$(FIREBASE_AUTH_TOKEN)"
Write-Host token direct: $token

# if Firebase parameters are not provided, get them from the CI environment variables
if ($firebaseToken -eq "") {
    $fireBaseToken = $env:FIREBASE_AUTH_TOKEN;
}

if ($firebaseProject -eq "") {
    $firebaseProject = $env:FIREBASE_PROJECT;
}

if ($releaseMessage -eq "") {
    $releaseMessage = $env:RELEASE_RELEASEWEBURL;
}

$dir = Split-Path $MyInvocation.MyCommand.Path
Push-Location $dir

Write-Host "installing Firebase tools..."
npm i -g firebase-tools
Write-Host "starting deployment..."
firebase deploy --token "'$fireBaseToken'" --project "'$fireBaseProject'" --message "'$releaseMessage'"
Write-Host "deployment completed"

Pop-Location