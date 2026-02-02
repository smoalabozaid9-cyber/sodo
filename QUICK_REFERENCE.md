# Quick Reference Guide - Lawyer Office SaaS

Quick commands and tips for daily use.

## 🚀 Starting the Application

### Development Mode (Recommended)

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### Production Mode
```bash
npm start
```

---

## 📦 Installation Commands

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..

# Install both at once
npm install && cd client && npm install && cd ..
```

---

## 🔧 Common MongoDB Commands

### Start MongoDB
```bash
# Windows (Service)
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Check MongoDB Status
```bash
# Mac
brew services list

# Linux
sudo systemctl status mongod
```

### Stop MongoDB
```bash
# Windows
net stop MongoDB

# Mac
brew services stop mongodb-community

# Linux
sudo systemctl stop mongod
```

---

## 💾 Database Operations

### Connect to MongoDB Shell
```bash
mongosh
```

### Common Database Commands
```javascript
// Switch to database
use lawyer-office

// View all collections
show collections

// Count documents
db.cases.countDocuments()
db.clients.countDocuments()
db.users.countDocuments()

// Find all cases
db.cases.find().pretty()

// Find open cases
db.cases.find({ status: "Open" }).pretty()

// Delete a specific case
db.cases.deleteOne({ caseNumber: "CASE-2024-001" })

// Clear all cases (CAREFUL!)
db.cases.deleteMany({})

// Backup database
exit
mongodump --db lawyer-office --out ./backup

// Restore database
mongorestore --db lawyer-office ./backup/lawyer-office
```

---

## 🎯 Application URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | React application |
| Backend API | http://localhost:5000/api | REST API |
| Health Check | http://localhost:5000/api/health | API status |

---

## 📊 User Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access to all features |
| **Lawyer** | Manage own cases and clients |
| **Paralegal** | View and assist with cases |

---

## 🔐 Default Configuration

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lawyer-office
JWT_SECRET=change_this_in_production
NODE_ENV=development
```

---

## 📋 Case Types

- Criminal
- Civil
- Family
- Corporate
- Real Estate
- Immigration
- Intellectual Property
- Labor
- Tax
- Other

---

## 🏷️ Case Statuses

| Status | Description |
|--------|-------------|
| **Open** | Newly created case |
| **In Progress** | Actively working on case |
| **Pending** | Waiting for action |
| **Closed** | Case completed |
| **Won** | Case won for client |
| **Lost** | Case lost |
| **Settled** | Out of court settlement |

---

## ⚡ Priority Levels

- 🔵 **Low** - Can wait
- 🟡 **Medium** - Normal priority
- 🟠 **High** - Needs attention soon
- 🔴 **Urgent** - Immediate attention required

---

## 🐛 Troubleshooting Commands

### Clear npm cache
```bash
npm cache clean --force
```

### Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Reset database
```bash
mongosh
use lawyer-office
db.dropDatabase()
```

### Check running processes
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :5000
lsof -i :3000
```

### Kill process on port
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

---

## 📝 Git Commands (If using version control)

```bash
# Initialize repository
git init
git add .
git commit -m "Initial commit"

# Create .gitignore (already included)
# Ensures node_modules and .env are not committed

# Push to remote
git remote add origin <your-repo-url>
git push -u origin main
```

---

## 🧪 Testing Checklist

- [ ] Register new user
- [ ] Login with credentials
- [ ] Create client
- [ ] Create case linked to client
- [ ] Update case status
- [ ] Add note to case
- [ ] Filter cases by status
- [ ] View client profile
- [ ] View case details
- [ ] Logout and login again

---

## 📞 Quick Fixes

### "Cannot connect to database"
```bash
# Start MongoDB
mongod
# Or as service: net start MongoDB (Windows)
```

### "Port already in use"
```bash
# Change port in .env
PORT=5001
```

### "JWT malformed error"
```bash
# Clear browser localStorage
# In browser console: localStorage.clear()
# Then login again
```

### "Module not found"
```bash
# Reinstall dependencies
npm install
cd client && npm install
```

---

## 🎨 Customization Tips

### Change Main Color
Edit `client/src/App.css`:
```css
.btn-primary {
  background-color: #your-color;
}
```

### Add Logo
1. Add logo file to `client/public/`
2. Update `client/src/components/Navbar.js`

### Change Port
Edit `.env`:
```env
PORT=your-port
```

---

## 📊 Useful Queries

### Find cases by lawyer
```javascript
db.cases.find({ "assignedLawyer": ObjectId("lawyer-id") })
```

### Find high priority open cases
```javascript
db.cases.find({ 
  status: "Open", 
  priority: "High" 
})
```

### Count cases by status
```javascript
db.cases.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])
```

---

## 🔒 Security Checklist

- [ ] Changed JWT_SECRET in .env
- [ ] Using strong passwords (12+ characters)
- [ ] MongoDB authentication enabled (production)
- [ ] HTTPS enabled (production)
- [ ] Regular backups configured
- [ ] User permissions properly set

---

## 📱 Mobile Access

The application is responsive and works on mobile devices. Access via:
```
http://your-computer-ip:3000
```

Make sure firewall allows connections on port 3000.

---

## 🚀 Performance Tips

1. **Index frequently queried fields**
   ```javascript
   db.cases.createIndex({ status: 1 })
   db.cases.createIndex({ caseNumber: 1 })
   ```

2. **Regular database cleanup**
   - Archive old closed cases
   - Remove test data

3. **Monitor MongoDB performance**
   ```bash
   mongosh
   db.serverStatus()
   ```

---

## 📖 Learning Resources

- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/
- **MongoDB**: https://docs.mongodb.com/
- **JWT**: https://jwt.io/introduction

---

## ⌨️ Keyboard Shortcuts (Browser)

- `Ctrl/Cmd + K` - Search (if implemented)
- `F5` - Refresh page
- `F12` - Open developer tools
- `Ctrl/Cmd + Shift + R` - Hard refresh (clear cache)

---

**Keep this guide handy for quick reference! ⚖️**
