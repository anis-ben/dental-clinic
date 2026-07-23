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
    echo [!] جاري تثبيت حزم وتطبيقات المشهد (node_modules)...
    echo [!] يرجى الانتظار لحظات حتى اكتمال التثبيت لأول مرة.
    echo =========================================================
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [X] حدث خطأ أثناء التثبيت. يرجى التأكد من الاتصال بالإنترنت.
        pause
        exit /b 1
    )
    echo.
    echo [OK] تم تثبيت الحزم بنجاح!
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
    echo [X] حدث خطأ أثناء تشغيل السيرفر.
    echo =========================================================
    echo.
    pause
)
