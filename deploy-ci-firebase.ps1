param(
    [string]$firebaseToken,
    [string]$firebaseProject,
    [string]$releaseMessage
)

# if Firebase parameters are not provided, get them from the CI environment variables
if ($firebaseToken -eq "") {
    $fireBaseToken = $env:FIREBASE_AUTH_TOKEN;
}

if ($firebaseProject -eq "") {
    $firebaseProject = $env:FIREBASE_PROJECT;
}

$dir = Split-Path $MyInvocation.MyCommand.Path
Push-Location $dir

Write-Host "installing Firebase tools..."
npm i -g firebase-tools
Write-Host "starting deployment..."
firebase deploy --token $fireBaseToken --project $fireBaseProject --message "Release: $releaseMessage"
Write-Host "deployment completed"

Pop-Location