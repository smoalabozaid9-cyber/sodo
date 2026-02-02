@echo off
color 0A
echo.
echo ========================================
echo   SMOOREAD - Railway Deployment
echo   نشر SMOOREAD على Railway
echo ========================================
echo.

REM Check if Railway CLI is installed
railway --version >nul 2>&1
if errorlevel 1 (
    echo Installing Railway CLI...
    echo تثبيت Railway CLI...
    echo.
    powershell -Command "iwr https://railway.app/install.ps1 -useb | iex"
    echo.
    echo ✅ Railway CLI installed!
    echo ✅ تم تثبيت Railway CLI!
    echo.
    echo Please close this window and run the script again.
    echo الرجاء إغلاق هذه النافذة وتشغيل السكريبت مرة أخرى.
    pause
    exit /b 0
)

echo ✅ Railway CLI is installed
echo ✅ Railway CLI مثبت
echo.

echo ========================================
echo Step 1: Login to Railway
echo الخطوة 1: تسجيل الدخول إلى Railway
echo ========================================
echo.
echo A browser window will open for login...
echo سيتم فتح نافذة المتصفح لتسجيل الدخول...
echo.

railway login

if errorlevel 1 (
    echo.
    echo ❌ Login failed
    echo ❌ فشل تسجيل الدخول
    pause
    exit /b 1
)

echo.
echo ✅ Login successful!
echo ✅ تم تسجيل الدخول بنجاح!
echo.

echo ========================================
echo Step 2: Initialize Project
echo الخطوة 2: تهيئة المشروع
echo ========================================
echo.

REM Check if already initialized
if exist ".railway" (
    echo Project already initialized
    echo المشروع مهيأ بالفعل
) else (
    echo Initializing new Railway project...
    echo تهيئة مشروع Railway جديد...
    railway init
)

echo.
echo ========================================
echo Step 3: Set Environment Variables
echo الخطوة 3: تعيين متغيرات البيئة
echo ========================================
echo.

echo Setting NODE_ENV...
railway variables set NODE_ENV=production

echo Setting PORT...
railway variables set PORT=5000

echo.
echo ⚠️  IMPORTANT: You need to set these manually:
echo ⚠️  مهم: تحتاج إلى تعيين هذه يدوياً:
echo.
echo 1. MONGODB_URI - Get from MongoDB Atlas
echo    MONGODB_URI - احصل عليه من MongoDB Atlas
echo.
echo 2. JWT_SECRET - Generate a secure random string
echo    JWT_SECRET - أنشئ مفتاحاً عشوائياً آمناً
echo.

set /p set_vars="Do you want to set them now? (y/n) / هل تريد تعيينها الآن؟ (y/n): "

if /i "%set_vars%"=="y" (
    echo.
    set /p mongodb_uri="Enter MONGODB_URI / أدخل MONGODB_URI: "
    if not "%mongodb_uri%"=="" (
        railway variables set MONGODB_URI="%mongodb_uri%"
        echo ✅ MONGODB_URI set
    )
    
    echo.
    set /p jwt_secret="Enter JWT_SECRET / أدخل JWT_SECRET: "
    if not "%jwt_secret%"=="" (
        railway variables set JWT_SECRET="%jwt_secret%"
        echo ✅ JWT_SECRET set
    ) else (
        echo Setting default JWT_SECRET...
        railway variables set JWT_SECRET="smooread_railway_secret_2024_change_this_in_production"
        echo ✅ Default JWT_SECRET set (remember to change later)
    )
)

echo.
echo ========================================
echo Step 4: Deploy to Railway
echo الخطوة 4: النشر على Railway
echo ========================================
echo.

echo Deploying SMOOREAD to Railway...
echo نشر SMOOREAD على Railway...
echo.

railway up

if errorlevel 1 (
    echo.
    echo ❌ Deployment failed
    echo ❌ فشل النشر
    echo.
    echo Check the logs above for errors
    echo تحقق من السجلات أعلاه للأخطاء
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✅ Deployment Successful!
echo   ✅ تم النشر بنجاح!
echo ========================================
echo.

echo Getting your live URL...
echo الحصول على رابطك المباشر...
echo.

railway open

echo.
echo ========================================
echo   🎉 SMOOREAD is now LIVE!
echo   🎉 SMOOREAD الآن مباشر!
echo ========================================
echo.
echo Your app should open in your browser
echo يجب أن يفتح تطبيقك في متصفحك
echo.
echo To view logs: railway logs
echo لعرض السجلات: railway logs
echo.
echo To get your URL: railway open
echo للحصول على رابطك: railway open
echo.
echo ========================================
echo.

pause
