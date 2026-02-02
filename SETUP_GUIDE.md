# Quick Setup Guide - Lawyer Office SaaS

This is a step-by-step guide to get your Lawyer Office SaaS application up and running quickly.

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Node.js and MongoDB

**Windows:**
1. Download Node.js from: https://nodejs.org/ (LTS version)
2. Download MongoDB from: https://www.mongodb.com/try/download/community
3. Run both installers with default settings

**Mac:**
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and MongoDB
brew install node
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Step 2: Install Project Dependencies

```bash
# Navigate to project directory
cd lawyer-office-saas

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 3: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env
```

The default settings work for local development. You're ready to go!

### Step 4: Start the Application

**Open TWO terminal windows:**

**Terminal 1 - Backend:**
```bash
npm run dev
```
You should see: "✅ MongoDB connected successfully" and "🚀 Server is running on port 5000"

**Terminal 2 - Frontend:**
```bash
npm run client
```
The browser should automatically open to `http://localhost:3000`

### Step 5: Create Your First User

1. Click "Register here" on the login page
2. Fill in your details:
   - Name: Your Name
   - Email: admin@yourfirm.com
   - Password: (at least 6 characters)
   - Role: Admin
3. Click "Register"

🎉 You're in! Welcome to your dashboard.

## 📖 First Steps After Login

### 1. Create Your First Client

1. Click "Clients" in the navigation
2. Click "+ New Client"
3. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@email.com
   - Phone: +1234567890
   - (Optional) Fill in address details
4. Click "Create Client"

### 2. Create Your First Case

1. Click "Cases" in the navigation
2. Click "+ New Case"
3. Fill in the form:
   - Case Number: CASE-2024-001
   - Title: Sample Case
   - Description: This is a test case
   - Client: Select "John Doe" (from dropdown)
   - Case Type: Civil
   - Status: Open
   - Priority: Medium
4. Click "Create Case"

### 3. Explore the Dashboard

1. Click "Dashboard" to see your statistics
2. View your recent cases
3. Use quick action buttons

## 🔧 Common Issues and Solutions

### Issue: "Cannot connect to MongoDB"

**Solution:**
```bash
# Check if MongoDB is running
# Windows:
# Go to Services and start "MongoDB Server"

# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
sudo systemctl status mongod
```

### Issue: "Port 5000 already in use"

**Solution:**
Edit the `.env` file and change the port:
```env
PORT=5001
```

### Issue: "npm install fails"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install again
npm install
```

### Issue: Frontend won't start

**Solution:**
```bash
# Make sure you're in the client directory
cd client

# Delete node_modules
rm -rf node_modules

# Install dependencies
npm install

# Try starting again
npm start
```

## 🎯 Testing Your Installation

Run this checklist to ensure everything works:

- [ ] Backend starts without errors
- [ ] Frontend opens in browser
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Dashboard loads with statistics
- [ ] Can create a client
- [ ] Can create a case
- [ ] Can view case details
- [ ] Can add notes to cases
- [ ] Can filter cases

## 📱 Using the Application

### Navigation

- **Dashboard**: Overview and statistics
- **Cases**: Manage all cases
- **Clients**: Manage all clients
- **Profile Icon**: Shows current user
- **Logout**: Sign out

### Case Management Workflow

1. **Create Client** → Add client information
2. **Create Case** → Link to client, add details
3. **Track Progress** → Update status, add notes
4. **Close Case** → Mark as Won/Lost/Settled/Closed

### Filtering Cases

Use the filter dropdowns to find cases by:
- Status (Open, In Progress, Closed, etc.)
- Case Type (Criminal, Civil, Family, etc.)
- Priority (Low, Medium, High, Urgent)

## 🔐 Security Recommendations

### For Production Use:

1. **Change JWT Secret**
   Edit `.env`:
   ```env
   JWT_SECRET=your_very_long_random_secret_key_here_minimum_32_characters
   ```

2. **Use Strong Passwords**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols

3. **Use Production Database**
   - Sign up for MongoDB Atlas (free tier available)
   - Replace MONGODB_URI in `.env`

4. **Enable HTTPS**
   - Use SSL certificate
   - Configure reverse proxy (nginx)

## 📊 Data Management

### Backup Your Data

```bash
# Export all data
mongodump --db lawyer-office --out ./backup

# Restore data
mongorestore --db lawyer-office ./backup/lawyer-office
```

### Clear Test Data

```bash
# Connect to MongoDB
mongosh

# Switch to database
use lawyer-office

# Clear collections
db.cases.deleteMany({})
db.clients.deleteMany({})
# Keep your user account:
# db.users.deleteMany({email: {$ne: "your@email.com"}})
```

## 🚀 Next Steps

1. **Customize**: Edit colors, add your firm logo
2. **Add Users**: Register lawyers and paralegals
3. **Import Data**: If you have existing client/case data
4. **Train Staff**: Show team members how to use the system
5. **Go Live**: Start managing real cases

## 📞 Getting Help

If you encounter issues:

1. Check this guide again
2. Review the main README.md
3. Check browser console for errors (F12)
4. Check terminal for error messages
5. Verify all services are running

## 🎓 Video Tutorial Suggestions

Create internal videos showing:
- [ ] How to register and login
- [ ] How to create and manage clients
- [ ] How to create and track cases
- [ ] How to use filters and search
- [ ] How to add case notes

---

**You're all set! Start managing your cases efficiently! ⚖️**
