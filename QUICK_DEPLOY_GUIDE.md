# Quick Deployment Guide | دليل النشر السريع

## 🚀 Fastest Way to Deploy (5 Minutes)

### Option 1: Heroku (Recommended for Beginners)

#### Prerequisites
- [x] Heroku account: https://www.heroku.com/
- [x] MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
- [x] Heroku CLI installed

#### Steps

**1. Set up MongoDB Atlas (2 minutes)**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Allow all IPs (0.0.0.0/0)
5. Get connection string
```

**2. Deploy to Heroku (3 minutes)**
```bash
# Double-click on:
deploy-heroku.bat

# OR manually:
heroku login
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET="your_secure_secret"
heroku config:set MONGODB_URI="your_mongodb_connection"
git push heroku main
heroku open
```

**Done! Your app is live! ✅**

---

## 📱 Option 2: DigitalOcean (Professional)

### Cost: $6/month

**1. Create Droplet**
- Ubuntu 22.04
- Basic plan ($6/mo)

**2. Run setup commands**
```bash
ssh root@your_ip

# Install dependencies
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs git nginx
npm install -g pm2

# Deploy app
cd /var/www
git clone your_repo lawyer-office
cd lawyer-office
npm install
cd client && npm install && npm run build && cd ..

# Create .env file
nano .env
# Paste your production variables

# Start with PM2
pm2 start server.js --name lawyer-office
pm2 startup
pm2 save

# Configure Nginx
# (See full guide for Nginx config)

# Get SSL certificate
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your_domain.com
```

**Done! Your app is live on your own server! ✅**

---

## 🔑 Environment Variables You Need

### 1. JWT_SECRET
Generate with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. MONGODB_URI
Get from MongoDB Atlas:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lawyer-office
```

### 3. NODE_ENV
```
production
```

---

## ✅ Checklist After Deployment

- [ ] App loads without errors
- [ ] Can register new user
- [ ] Can login
- [ ] Can create client
- [ ] Can create case
- [ ] HTTPS is working
- [ ] MongoDB is connected
- [ ] All pages load correctly

---

## 🆘 Quick Fixes

### "Cannot connect to MongoDB"
```bash
# Check MongoDB Atlas IP whitelist
# Add 0.0.0.0/0 or your server IP
```

### "Application Error"
```bash
# Check logs
heroku logs --tail

# OR on server
pm2 logs
```

### "502 Bad Gateway"
```bash
# Restart app
pm2 restart lawyer-office

# Restart Nginx
systemctl restart nginx
```

---

## 📞 Support

For detailed instructions, see:
- **DEPLOYMENT_GUIDE.md** (English)
- **DEPLOYMENT_GUIDE_AR.md** (Arabic)

---

# النسخة العربية | Arabic Version

## 🚀 أسرع طريقة للنشر (5 دقائق)

### الخيار 1: Heroku (موصى به للمبتدئين)

#### المتطلبات
- [x] حساب Heroku: https://www.heroku.com/
- [x] حساب MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- [x] تثبيت Heroku CLI

#### الخطوات

**1. إعداد MongoDB Atlas (دقيقتان)**
```
1. اذهب إلى https://www.mongodb.com/cloud/atlas
2. أنشئ مجموعة مجانية
3. أنشئ مستخدم قاعدة البيانات
4. اسمح بجميع عناوين IP (0.0.0.0/0)
5. احصل على رابط الاتصال
```

**2. النشر على Heroku (3 دقائق)**
```bash
# انقر نقراً مزدوجاً على:
deploy-heroku.bat

# أو يدوياً:
heroku login
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET="مفتاحك_الآمن"
heroku config:set MONGODB_URI="رابط_mongodb"
git push heroku main
heroku open
```

**تم! تطبيقك الآن مباشر! ✅**

---

## 🔑 المتغيرات البيئية المطلوبة

### 1. JWT_SECRET
أنشئه باستخدام:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. MONGODB_URI
احصل عليه من MongoDB Atlas:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lawyer-office
```

### 3. NODE_ENV
```
production
```

---

## ✅ قائمة المراجعة بعد النشر

- [ ] التطبيق يعمل بدون أخطاء
- [ ] يمكن تسجيل مستخدم جديد
- [ ] يمكن تسجيل الدخول
- [ ] يمكن إنشاء عميل
- [ ] يمكن إنشاء قضية
- [ ] HTTPS يعمل
- [ ] MongoDB متصل
- [ ] جميع الصفحات تحمّل بشكل صحيح

---

## 🆘 إصلاحات سريعة

### "لا يمكن الاتصال بـ MongoDB"
```bash
# تحقق من القائمة البيضاء لـ MongoDB Atlas
# أضف 0.0.0.0/0 أو عنوان IP الخادم
```

### "خطأ في التطبيق"
```bash
# تحقق من السجلات
heroku logs --tail

# أو على الخادم
pm2 logs
```

### "502 Bad Gateway"
```bash
# إعادة تشغيل التطبيق
pm2 restart lawyer-office

# إعادة تشغيل Nginx
systemctl restart nginx
```

---

## 📞 الدعم

للحصول على تعليمات مفصلة، انظر:
- **DEPLOYMENT_GUIDE.md** (الإنجليزية)
- **DEPLOYMENT_GUIDE_AR.md** (العربية)

---

**Ready to deploy? Choose your option and follow the steps!**

**مستعد للنشر؟ اختر خيارك واتبع الخطوات!**
