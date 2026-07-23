@echo off
title Dental Clinic - Start Localhost Server
cls
color 0A

:: Navigate to project directory
cd /d "%~dp0.."

echo =========================================================
echo  Dental Clinic - Launching Localhost Server
echo =========================================================
echo.

:: Check if node_modules exists
if not exist "node_modules\" (
    echo =========================================================
    echo [!] Packages (node_modules) are not installed yet.
    echo [!] Installing dependencies now... Please wait a moment.
    echo =========================================================
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [X] Error during npm install. Please check your internet connection.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Installation completed successfully!
    echo.
)

echo Opening http://localhost:3000 in your browser...
start http://localhost:3000

echo Starting Next.js Development Server...
echo.
call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo =========================================================
    echo [X] ERROR: The server encountered an issue and stopped.
    echo =========================================================
    echo.
    pause
)
