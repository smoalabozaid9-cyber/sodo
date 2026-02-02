@echo off
color 0A
echo.
echo ========================================
echo   LAWYER OFFICE SAAS - QUICK START
echo ========================================
echo.
echo This will open TWO windows:
echo   1. Backend Server (API)
echo   2. Frontend (Web Interface)
echo.
echo IMPORTANT: Keep both windows open!
echo.
pause
echo.
echo Starting servers...
echo.
start "Lawyer Office SaaS - Backend" cmd /k start-backend.bat
timeout /t 5 /nobreak >nul
start "Lawyer Office SaaS - Frontend" cmd /k start-frontend.bat
echo.
echo ========================================
echo   SERVERS STARTING...
echo ========================================
echo.
echo Two windows have opened:
echo   - Backend (black window)
echo   - Frontend (will open browser)
echo.
echo Wait 10-15 seconds for the browser to open
echo at http://localhost:3000
echo.
echo If browser doesn't open, manually go to:
echo http://localhost:3000
echo.
echo ========================================
echo.
echo To STOP the servers:
echo   - Close both server windows, or
echo   - Press Ctrl+C in each window
echo.
pause
