@echo off
title Dental Clinic - Stop Localhost Server
cls
echo =========================================================
echo  Dental Clinic - Stopping Localhost Server (Port 3000)
echo =========================================================
echo.

set FOUND=0
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo Terminating server process PID %%a...
    taskkill /F /PID %%a >nul 2>&1
    set FOUND=1
)

echo.
if %FOUND%==1 (
    echo =========================================================
    echo  SUCCESS: Localhost server stopped successfully.
    echo =========================================================
) else (
    echo =========================================================
    echo  INFO: No running server was found on Port 3000.
    echo =========================================================
)

echo.
echo Closing in 3 seconds...
timeout /t 3 >nul
