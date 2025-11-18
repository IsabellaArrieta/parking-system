# Script para iniciar Backend y Frontend de forma simultánea (Windows)
# Ejecutar desde la raíz del proyecto: .\start-dev.ps1

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  NorthSpot Parking System - Dev Start" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js está instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
if (-Not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js." -ForegroundColor Red
    exit
}
Write-Host "✓ Node.js instalado" -ForegroundColor Green

# Verificar si Python está instalado
Write-Host "Verificando Python..." -ForegroundColor Yellow
if (-Not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Python no está instalado. Por favor instala Python." -ForegroundColor Red
    exit
}
Write-Host "✓ Python instalado" -ForegroundColor Green
Write-Host ""

# Terminal 1: Backend
Write-Host "Iniciando Backend en nueva terminal..." -ForegroundColor Cyan
$backendJob = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; python -m pip install -q -r requirements.txt 2>$null; Write-Host 'Iniciando uvicorn...' -ForegroundColor Yellow; uvicorn app.main:app --reload" -PassThru
Write-Host "✓ Backend iniciado (PID: $($backendJob.Id))" -ForegroundColor Green

# Esperar 3 segundos
Start-Sleep -Seconds 3

# Terminal 2: Frontend
Write-Host "Iniciando Frontend en nueva terminal..." -ForegroundColor Cyan
$frontendJob = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm install -q 2>$null; npm run dev" -PassThru
Write-Host "✓ Frontend iniciado (PID: $($frontendJob.Id))" -ForegroundColor Green

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "✓ Servidores iniciados correctamente!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "📍 Docs:     http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "📍 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C en ambas terminales para detener los servidores." -ForegroundColor Yellow
