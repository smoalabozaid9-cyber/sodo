@echo off
color 0A
echo.
echo ========================================
echo   Upload SMOOREAD to GitHub
echo   رفع SMOOREAD إلى GitHub
echo ========================================
echo.
echo Repository: https://github.com/smoalabozaid9-cyber/sodo.git
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed
    echo ❌ Git غير مثبت
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo الرجاء تثبيت Git من: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git is installed
echo ✅ Git مثبت
echo.

echo ========================================
echo Step 1: Git Configuration
echo الخطوة 1: تكوين Git
echo ========================================
echo.

REM Check if Git is configured
git config user.name >nul 2>&1
if errorlevel 1 (
    echo Git user not configured
    echo مستخدم Git غير مكون
    echo.
    set /p username="Enter your name / أدخل اسمك: "
    git config --global user.name "%username%"
    
    set /p email="Enter your email / أدخل بريدك الإلكتروني: "
    git config --global user.email "%email%"
    echo.
    echo ✅ Git configured
    echo ✅ تم تكوين Git
) else (
    echo ✅ Git already configured
    echo ✅ Git مكون بالفعل
)

echo.
echo ========================================
echo Step 2: Initialize Repository
echo الخطوة 2: تهيئة المستودع
echo ========================================
echo.

REM Check if .git exists
if exist ".git" (
    echo ✅ Git repository already initialized
    echo ✅ مستودع Git مهيأ بالفعل
) else (
    echo Initializing Git repository...
    echo تهيئة مستودع Git...
    git init
    git branch -M main
    echo ✅ Repository initialized
    echo ✅ تم تهيئة المستودع
)

echo.
echo ========================================
echo Step 3: Add Remote Repository
echo الخطوة 3: إضافة المستودع البعيد
echo ========================================
echo.

REM Remove existing remote if any
git remote remove origin 2>nul

REM Add remote
echo Adding GitHub repository...
echo إضافة مستودع GitHub...
git remote add origin https://github.com/smoalabozaid9-cyber/sodo.git

if errorlevel 1 (
    echo ❌ Failed to add remote
    echo ❌ فشل في إضافة المستودع البعيد
    pause
    exit /b 1
)

echo ✅ Remote repository added
echo ✅ تم إضافة المستودع البعيد

REM Verify remote
echo.
echo Verifying remote...
git remote -v

echo.
echo ========================================
echo Step 4: Add Files
echo الخطوة 4: إضافة الملفات
echo ========================================
echo.

echo Adding all files...
echo إضافة جميع الملفات...
git add .

echo.
echo ✅ Files added
echo ✅ تم إضافة الملفات

echo.
echo Files to be committed:
echo الملفات التي سيتم رفعها:
git status --short

echo.
echo ========================================
echo Step 5: Commit Changes
echo الخطوة 5: حفظ التغييرات
echo ========================================
echo.

echo Creating commit...
echo إنشاء commit...
git commit -m "Initial commit: SMOOREAD Lawyer Office Management System - Arabic Interface"

if errorlevel 1 (
    echo.
    echo ⚠️  No changes to commit or commit failed
    echo ⚠️  لا توجد تغييرات للحفظ أو فشل الحفظ
    echo.
    echo This might be because:
    echo 1. Files are already committed
    echo 2. No changes were made
    echo.
    set /p continue="Continue to push? (y/n) / متابعة الرفع؟ (y/n): "
    if /i not "%continue%"=="y" (
        pause
        exit /b 0
    )
) else (
    echo ✅ Commit created
    echo ✅ تم إنشاء commit
)

echo.
echo ========================================
echo Step 6: Push to GitHub
echo الخطوة 6: الرفع إلى GitHub
echo ========================================
echo.

echo ⚠️  IMPORTANT / مهم:
echo.
echo You will need to authenticate with GitHub
echo ستحتاج إلى المصادقة مع GitHub
echo.
echo Options / الخيارات:
echo 1. Use GitHub username and Personal Access Token
echo    استخدم اسم مستخدم GitHub ورمز الوصول الشخصي
echo.
echo 2. Use GitHub Desktop (easier)
echo    استخدم GitHub Desktop (أسهل)
echo.
echo To create a token / لإنشاء رمز:
echo https://github.com/settings/tokens
echo.

pause

echo.
echo Pushing to GitHub...
echo الرفع إلى GitHub...
echo.

REM Try to pull first to avoid conflicts
echo Checking for existing files...
git pull origin main --allow-unrelated-histories 2>nul

echo.
echo Pushing your code...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ⚠️  Push failed. Trying force push...
    echo ⚠️  فشل الرفع. محاولة الرفع القسري...
    echo.
    
    set /p force="Force push? This will overwrite remote files. (y/n) / رفع قسري؟ سيستبدل الملفات البعيدة. (y/n): "
    if /i "%force%"=="y" (
        git push -u origin main --force
        
        if errorlevel 1 (
            echo.
            echo ❌ Force push also failed
            echo ❌ فشل الرفع القسري أيضاً
            echo.
            echo Please check:
            echo الرجاء التحقق من:
            echo 1. Your internet connection / اتصال الإنترنت
            echo 2. GitHub authentication / مصادقة GitHub
            echo 3. Repository permissions / صلاحيات المستودع
            echo.
            pause
            exit /b 1
        )
    ) else (
        echo.
        echo Push cancelled / تم إلغاء الرفع
        pause
        exit /b 0
    )
)

echo.
echo ========================================
echo   ✅ SUCCESS! Upload Complete!
echo   ✅ نجح! تم الرفع بنجاح!
echo ========================================
echo.
echo Your SMOOREAD project is now on GitHub!
echo مشروع SMOOREAD الآن على GitHub!
echo.
echo View at / شاهده على:
echo https://github.com/smoalabozaid9-cyber/sodo
echo.

REM Open GitHub repository in browser
set /p open="Open repository in browser? (y/n) / فتح المستودع في المتصفح؟ (y/n): "
if /i "%open%"=="y" (
    start https://github.com/smoalabozaid9-cyber/sodo
)

echo.
echo ========================================
echo   🚀 Next Steps
echo   🚀 الخطوات التالية
echo ========================================
echo.
echo 1. Verify files on GitHub
echo    تحقق من الملفات على GitHub
echo.
echo 2. Deploy to Railway from GitHub
echo    انشر على Railway من GitHub
echo.
echo 3. Enable auto-deployments
echo    فعّل النشر التلقائي
echo.
echo ========================================
echo.

pause
