# 🚂 Deploy SMOOREAD to Railway - Complete Guide

## Why Railway Instead of Heroku?

Railway is a modern platform-as-a-service that's easier and better than Heroku in many ways:

✅ **$5 FREE credit per month** (Heroku free tier ended in 2022)
✅ **No sleeping** - Your app stays active 24/7
✅ **Faster deployments** - Builds are quicker
✅ **Better developer experience** - Modern UI and easier to use
✅ **Automatic HTTPS** - SSL certificates included
✅ **Built-in PostgreSQL/MongoDB** - Optional internal database
✅ **No credit card required** for free tier

---

## 📋 What You Need

- [x] Your SMOOREAD application working locally ✅
- [ ] Railway account (we'll create this)
- [ ] MongoDB Atlas account (we'll create this)
- [ ] GitHub account (optional but recommended)
- [ ] 15-20 minutes of your time

---

## 🎯 Quick Overview - 3 Main Steps

```
Step 1: Setup MongoDB Atlas (Database - 5 minutes)
        ↓
Step 2: Deploy to Railway (10 minutes)
        ↓
Step 3: Your app is LIVE!
```

---

## 📊 Step 1: MongoDB Atlas Setup (5 minutes)

### 1.1 Create MongoDB Atlas Account

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. **Sign up with:**
   - Email: your_email@gmail.com
   - Password: Strong password
   - First Name & Last Name
4. Click **"Create your Atlas account"**
5. **Verify email** (check inbox)

### 1.2 Create Free Cluster

1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. **Settings:**
   - Provider: **AWS**
   - Region: **Choose closest to your users**
   - Cluster Name: **smooread-cluster**
4. Click **"Create"**
5. Wait 3-5 minutes for cluster creation

### 1.3 Create Database User

1. In the security quickstart:
2. **Username:** `smooread-admin`
3. **Password:** Click "Autogenerate" and **SAVE IT!**
   ```
   Example: AbC123xYz789
   ⚠️ SAVE THIS PASSWORD - You'll need it!
   ```
4. Click **"Create User"**

### 1.4 Configure Network Access

1. Still in security quickstart
2. Click **"Add My Current IP Address"**
3. **Then:** Click **"Add IP Address"** → **"Allow Access from Anywhere"**
4. IP: `0.0.0.0/0`
5. Click **"Confirm"**

### 1.5 Get Connection String

1. Click **"Finish and Close"**
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. **Copy** the connection string:
   ```
   mongodb+srv://smooread-admin:<password>@smooread-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace** `<password>` with your saved password
6. **Add** database name before `?`:
   ```
   mongodb+srv://smooread-admin:AbC123xYz789@smooread-cluster.xxxxx.mongodb.net/smooread?retryWrites=true&w=majority
   ```
7. **SAVE THIS!** You'll use it in Step 2.

✅ **MongoDB Atlas Ready!**

---

## 🚂 Step 2: Deploy to Railway (10 minutes)

### 2.1 Create Railway Account

1. **Go to:** https://railway.app/
2. Click **"Start a New Project"** or **"Login"**
3. **Sign up with GitHub** (Recommended)
   - Click **"Login with GitHub"**
   - Authorize Railway
4. **OR sign up with email**
   - Enter email
   - Verify email
   - Set password

### 2.2 Prepare Your Project for Railway

**Option A: Deploy from Local Files (Easier)**

1. Make sure you're in your project directory
2. **Create Railway configuration:**

Create a file named `railway.toml` in your project root:

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

**Option B: Deploy from GitHub (Recommended for updates)**

1. **Create GitHub repository:**
   - Go to https://github.com/new
   - Repository name: `smooread`
   - Make it Public or Private
   - Click "Create repository"

2. **Push your code to GitHub:**
```bash
git init
git add .
git commit -m "Initial SMOOREAD commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smooread.git
git push -u origin main
```

### 2.3 Deploy to Railway

#### Method 1: Deploy from GitHub (Recommended)

1. **In Railway Dashboard:**
2. Click **"New Project"**
3. Click **"Deploy from GitHub repo"**
4. **Select your repository:** `smooread`
5. Click **"Deploy Now"**
6. Railway will automatically detect it's a Node.js app

#### Method 2: Deploy from CLI

1. **Install Railway CLI:**

**Windows (PowerShell as Admin):**
```powershell
iwr https://railway.app/install.ps1 -useb | iex
```

**Mac/Linux:**
```bash
curl -fsSL https://railway.app/install.sh | sh
```

2. **Deploy your app:**
```bash
# Login to Railway
railway login

# Initialize project
railway init

# Link to your project (if already created)
railway link

# Deploy
railway up
```

### 2.4 Configure Environment Variables

1. **In Railway Dashboard:**
2. Go to your project
3. Click on the **"Variables"** tab
4. Click **"+ New Variable"**

**Add these variables:**

```plaintext
Variable 1:
Name: NODE_ENV
Value: production

Variable 2:
Name: PORT
Value: 5000

Variable 3:
Name: MONGODB_URI
Value: mongodb+srv://smooread-admin:YOUR_PASSWORD@smooread-cluster.xxxxx.mongodb.net/smooread?retryWrites=true&w=majority

Variable 4:
Name: JWT_SECRET
Value: smooread_railway_secret_2024_xyz123abc789def456ghi
```

**To generate secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. Click **"Deploy"** after adding variables

### 2.5 Get Your Live URL

1. Go to **"Settings"** tab in Railway
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. Railway will give you a URL like:
   ```
   https://smooread-production.up.railway.app
   ```
   or
   ```
   https://smooread-production-xxxx.up.railway.app
   ```

5. **Copy this URL** - This is your live website!

✅ **Your SMOOREAD app is now LIVE on Railway!** 🎉

---

## 🎉 Step 3: Access Your Live Website

### Your Live URLs:

**Main Application:**
```
https://smooread-production.up.railway.app
```

**API Health Check:**
```
https://smooread-production.up.railway.app/api/health
```

### First-Time Setup:

1. **Open your Railway URL** in browser
2. You should see the login page in Arabic
3. Click **"سجل هنا" (Register here)**
4. **Create admin account:**
   ```
   الاسم الكامل: Your Name
   البريد الإلكتروني: admin@smooread.com
   كلمة المرور: SmooRead2024!
   الدور الوظيفي: مدير النظام (Admin)
   ```
5. Click **"تسجيل" (Register)**
6. **You're logged in!** Start using SMOOREAD! 🎊

---

## 🎨 Add Custom Domain (Optional)

Instead of `smooread-production.up.railway.app`, use `smooread.com`

### Step 1: Buy a Domain

**Recommended Registrars:**
- Namecheap: https://www.namecheap.com/
- Cloudflare: https://www.cloudflare.com/products/registrar/
- GoDaddy: https://www.godaddy.com/

**Search for:** `smooread.com` or `smooread.net`

### Step 2: Connect Domain to Railway

1. **In Railway Dashboard:**
   - Go to **Settings** → **Domains**
   - Click **"Custom Domain"**
   - Enter: `smooread.com`
   - Railway shows you DNS records

2. **In Your Domain Registrar:**
   - Add CNAME record:
     ```
     Type: CNAME
     Name: www
     Value: smooread-production.up.railway.app
     ```
   - Add A/ALIAS record for root:
     ```
     Type: A or ALIAS
     Name: @
     Value: (provided by Railway)
     ```

3. **Wait 1-24 hours** for DNS propagation

4. **Your site is live at:** `https://smooread.com` ✅

---

## 💰 Railway Pricing & Free Tier

### Free Tier (Trial):
- ✅ **$5 FREE credit per month**
- ✅ Usage-based (pay as you go)
- ✅ Credit card required but won't be charged if under $5
- ✅ Typical small app: **$3-5/month** = **FREE with credits**
- ✅ No sleeping - app stays active 24/7

### What $5 Credit Gets You:
- ~500 hours of runtime
- ~1GB of RAM
- Perfect for small-medium apps
- SMOOREAD will likely use **$2-4/month**

### Hobby Plan ($5/month):
- $5 credit + option to add more
- Better for production apps
- Still very affordable

### When You Exceed Free Tier:
- Railway will email you
- You can add a credit card
- Or optimize your app to use less resources

---

## 🔧 Managing Your Railway App

### View Logs

**In Railway Dashboard:**
1. Click on your project
2. Click **"Deployments"** tab
3. View real-time logs

**Using CLI:**
```bash
railway logs
```

### Redeploy

**Automatic (if using GitHub):**
- Just push to GitHub: `git push`
- Railway auto-deploys

**Manual:**
```bash
railway up
```

### Restart App

**In Dashboard:**
1. Go to your service
2. Click **"..."** menu
3. Click **"Restart"**

### Environment Variables

**View:**
```bash
railway variables
```

**Set:**
```bash
railway variables set KEY=value
```

---

## 📊 Railway vs Heroku Comparison

| Feature | Railway | Heroku |
|---------|---------|--------|
| **Free Tier** | $5/month credit | None (ended 2022) |
| **Sleeping** | Never sleeps | Sleeps on free tier |
| **Deployment** | Faster | Slower |
| **Interface** | Modern, easy | Complex |
| **Auto-deploys** | Yes (GitHub) | Yes |
| **Custom Domain** | Free | Free on paid |
| **Database** | Easy to add | Requires add-ons |
| **CLI** | Excellent | Good |
| **Pricing** | Usage-based | Fixed tiers |
| **Best For** | Modern apps | Legacy apps |

**Winner: Railway** 🏆 (for new projects)

---

## 🐛 Troubleshooting

### Problem: "Application failed to respond"

**Solution:**
```bash
# Check logs
railway logs

# Common causes:
# 1. MongoDB URI incorrect
# 2. PORT not set to 5000
# 3. NODE_ENV not set

# Fix variables
railway variables set MONGODB_URI="correct_uri"
railway variables set PORT=5000
railway variables set NODE_ENV=production

# Restart
railway restart
```

### Problem: "Cannot connect to MongoDB"

**Solution:**
1. Check MongoDB Atlas IP whitelist (0.0.0.0/0)
2. Verify connection string
3. Check password in URI
4. Ensure database name is in URI

### Problem: Build fails

**Solution:**
```bash
# Check if package.json has correct scripts
# Should have:
"scripts": {
  "start": "node server.js",
  "build": "cd client && npm run build"
}

# Ensure dependencies are installed
npm install

# Redeploy
railway up
```

### Problem: Variables not updating

**Solution:**
```bash
# After changing variables, restart:
railway restart

# Or redeploy:
railway up
```

---

## 📱 Quick Start Script for Railway

Create `deploy-railway.bat` in your project:

```batch
@echo off
echo ========================================
echo   Railway Deployment for SMOOREAD
echo ========================================
echo.

REM Install Railway CLI (if not installed)
echo Installing Railway CLI...
iwr https://railway.app/install.ps1 -useb | iex

echo.
echo Logging into Railway...
railway login

echo.
echo Initializing project...
railway init

echo.
echo Deploying to Railway...
railway up

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your app should be live soon!
echo Check Railway dashboard for URL.
echo.

pause
```

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access set to 0.0.0.0/0
- [ ] Connection string saved
- [ ] Railway account created
- [ ] Project deployed to Railway
- [ ] Environment variables set (NODE_ENV, PORT, MONGODB_URI, JWT_SECRET)
- [ ] Custom domain generated
- [ ] Can access live URL
- [ ] Can register admin account
- [ ] Can login successfully
- [ ] Can create client
- [ ] Can create case
- [ ] All features working

---

## 🎓 Additional Resources

**Railway Docs:**
- https://docs.railway.app/

**Railway Discord:**
- https://discord.gg/railway

**MongoDB Atlas:**
- https://docs.atlas.mongodb.com/

**SMOOREAD Support:**
- Check deployment logs
- Review environment variables
- Test MongoDB connection

---

## 🎯 Summary

**What You Did:**
1. ✅ Created MongoDB Atlas database (FREE)
2. ✅ Deployed SMOOREAD to Railway (FREE $5 credit)
3. ✅ Got live URL: `https://smooread-production.up.railway.app`
4. ✅ Full-featured lawyer office management system online!

**Cost:** FREE (with $5 monthly credit)

**Your Live App:** Accessible worldwide 24/7

**Features:**
- Arabic interface
- Case management
- Client management
- User authentication
- Real-time data
- Mobile responsive

---

## 🚀 Next Steps

1. **Test your live app** thoroughly
2. **Share URL** with team/clients
3. **Add custom domain** (optional)
4. **Monitor usage** in Railway dashboard
5. **Add more features** as needed

---

**Your SMOOREAD app is now LIVE on Railway! 🎉**

**Live URL:** `https://smooread-production.up.railway.app`

**Enjoy your professional lawyer office management system!**
