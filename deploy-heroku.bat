@echo off
echo ========================================
echo   Heroku Deployment Script
echo   ����� ����� ��� Heroku
echo ========================================
echo.

REM Check if Heroku CLI is installed
heroku --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Heroku CLI is not installed
    echo ���: Heroku CLI ��� ꧢ�
    echo.
    echo Please install from: https://devcenter.heroku.com/articles/heroku-cli
    echo ��� ��� �����: https://devcenter.heroku.com/articles/heroku-cli
    pause
    exit /b 1
)

echo ✅ Heroku CLI is installed
echo ✅ Heroku CLI ꧢ�
echo.

REM Check if Git is initialized
if not exist ".git" (
    echo Initializing Git repository...
    echo ����� ꦥ� Git...
    git init
    git add .
    git commit -m "Initial commit for Heroku deployment"
)

echo.
echo ========================================
echo Step 1: Login to Heroku
echo ���� 1: ����� ����� ��� Heroku
echo ========================================
echo.

heroku login

echo.
echo ========================================
echo Step 2: Create Heroku App
echo ���� 2: ��� ����� Heroku
echo ========================================
echo.
echo Choose an option:
echo ��� �����:
echo.
echo 1. Create new app with random name
echo    ��� ����� ���� ����� 㧧��
echo.
echo 2. Create new app with custom name
echo    ��� ����� ����� ��� ꨥ�
echo.
echo 3. Use existing app
echo    ��롡� ����� ꦥ�
echo.

set /p choice="Enter choice (1, 2, or 3) / ���� ������ (1 �� 2 �� 3): "

if "%choice%"=="1" (
    heroku create
) else if "%choice%"=="2" (
    set /p appname="Enter app name / ���� ��� �����: "
    heroku create %appname%
) else if "%choice%"=="3" (
    set /p appname="Enter existing app name / ���� ��� ����� ������: "
    heroku git:remote -a %appname%
) else (
    echo Invalid choice / ������ ��� ���
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 3: Set Environment Variables
echo ���� 3: ����� ꢨ覢 �橸�
echo ========================================
echo.

echo Setting NODE_ENV to production...
heroku config:set NODE_ENV=production

echo.
echo IMPORTANT: You need to set these variables manually:
echo �� 騧: ��� ����� ��� �ꢨ覢 �李��:
echo.
echo 1. JWT_SECRET - Generate a secure random string
echo    JWT_SECRET - ���� ꨥ� 㧧�� ����
echo.
echo 2. MONGODB_URI - Get from MongoDB Atlas
echo    MONGODB_URI - ���� �� MongoDB Atlas
echo.

set /p jwt_secret="Enter JWT_SECRET (or press Enter to set later) / ���� JWT_SECRET (�� ���� Enter �������� ����): "
if not "%jwt_secret%"=="" (
    heroku config:set JWT_SECRET="%jwt_secret%"
)

set /p mongodb_uri="Enter MONGODB_URI (or press Enter to set later) / ���� MONGODB_URI (�� ���� Enter �������� ����): "
if not "%mongodb_uri%"=="" (
    heroku config:set MONGODB_URI="%mongodb_uri%"
)

echo.
echo ========================================
echo Step 4: Deploy to Heroku
echo ���� 4: ����� ��� Heroku
echo ========================================
echo.

echo Committing latest changes...
echo ����� ����著� ��奸�...
git add .
git commit -m "Deploy to Heroku"

echo.
echo Pushing to Heroku...
echo ����� ��� Heroku...
git push heroku main

if errorlevel 1 (
    echo.
    echo Trying master branch...
    echo ꧩ�� 墠 master...
    git push heroku master
)

echo.
echo ========================================
echo Deployment Complete!
echo �� ����� ��顷!
echo ========================================
echo.

echo Opening your app in browser...
echo 墥 ����� �� ��ꢭ�...
heroku open

echo.
echo View logs with: heroku logs --tail
echo 㩏 ��ꫢ �ꊢ�: heroku logs --tail
echo.

pause
