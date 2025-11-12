param(
  [Parameter(Mandatory = $false)]
  [string]$ProjectId = "215168468499",

  [Parameter(Mandatory = $false)]
  [string]$Region = "southamerica-east1",

  [Parameter(Mandatory = $false)]
  [string]$ServiceName = "semades-auth-api",

  [Parameter(Mandatory = $false)]
  [string]$MongoUri,

  [Parameter(Mandatory = $false)]
  [string]$JwtKey
)

if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
  throw "gcloud CLI não encontrado no PATH. Instale: https://cloud.google.com/sdk/docs/install"
}

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$apiPath = Join-Path $root "api_auth_node"
$envFile = Join-Path $apiPath ".env"
$image = $null

function Get-EnvValue {
  param([string]$Key)
  if (-not (Test-Path $envFile)) { return $null }
  $line = Get-Content $envFile | Where-Object { $_ -match "^\s*$Key\s*=" } | Select-Object -First 1
  if (-not $line) { return $null }
  $value = $line -replace "^\s*$Key\s*=\s*", ""
  return $value.Trim('"').Trim("'")
}

if (-not $MongoUri) {
  $MongoUri = Get-EnvValue -Key "MONGO_URI"
}

if (-not $JwtKey) {
  $JwtKey = Get-EnvValue -Key "JWT_KEY"
}

if (-not $MongoUri -or -not $JwtKey) {
  throw "Informe --MongoUri e --JwtKey ou garanta que existam em api_auth_node/.env."
}

function Resolve-ProjectId {
  param([string]$InputProject)
  $projectValue = (& gcloud projects describe $InputProject --format="value(projectId)" 2>$null)
  if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($projectValue)) {
    throw "Não foi possível resolver o Project ID a partir de '$InputProject'. Verifique se o projeto existe e se você tem acesso."
  }
  return $projectValue.Trim()
}

$EffectiveProjectId = Resolve-ProjectId -InputProject $ProjectId
$image = "gcr.io/$EffectiveProjectId/$ServiceName"

function Invoke-Gcloud {
  param([string]$Command)
  Write-Host ">> $Command" -ForegroundColor Cyan
  $LASTEXITCODE = 0
  Invoke-Expression $Command
  if ($LASTEXITCODE -ne 0) {
    throw "Falha ao executar: $Command"
  }
}

Push-Location $root
try {
  Invoke-Gcloud "gcloud config set project $EffectiveProjectId"
  Invoke-Gcloud "gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com --project $EffectiveProjectId"
  Invoke-Gcloud "gcloud builds submit `"$apiPath`" --tag $image --project $EffectiveProjectId"
  $mongoFlag = "--set-env-vars MONGO_URI=`"$MongoUri`""
  $jwtFlag = "--set-env-vars JWT_KEY=`"$JwtKey`""
  Invoke-Gcloud "gcloud run deploy $ServiceName --image $image --region $Region --allow-unauthenticated $mongoFlag $jwtFlag --project $EffectiveProjectId"
  Write-Host "Deploy concluído. URL do serviço:" -ForegroundColor Green
  Invoke-Gcloud "gcloud run services describe $ServiceName --region $Region --format='value(status.url)' --project $EffectiveProjectId"
}
finally {
  Pop-Location
}
