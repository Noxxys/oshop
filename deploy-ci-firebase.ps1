param(
    [string]$firebaseToken,
    [string]$firebaseProject,
    [string]$releaseMessage
)

Write-Host token parameter: $firebaseToken
Write-Host project parameter: $firebaseProject
Write-Host message parameter: $releaseMessage

Write-Host token env: $firebaseToken
Write-Host project env: $firebaseProject
Write-Host message env: $releaseMessage

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