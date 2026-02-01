# Lawyer Office SaaS - Case Management System

A comprehensive SaaS application for law offices to manage cases, clients, and legal data efficiently.

## 🎯 Features

- **User Authentication**: Secure login and registration system with role-based access (Admin, Lawyer, Paralegal)
- **Case Management**: Create, update, track, and manage legal cases with detailed information
- **Client Management**: Store and manage client information, contact details, and documents
- **Dashboard**: Overview of cases, statistics, and quick actions
- **Case Notes**: Add notes and track case progress
- **Advanced Filtering**: Filter cases by status, type, and priority
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 Installation

### 1. Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd lawyer-office-saas

# Or extract the ZIP file and navigate to the directory
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your settings:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lawyer-office
JWT_SECRET=your_secure_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

**Important**: Change the `JWT_SECRET` to a secure random string in production!

### 5. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Windows (if installed as service)
# MongoDB should start automatically

# On Mac/Linux
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

### 6. Start the Application

**Option A: Run Backend and Frontend Separately (Recommended for Development)**

Terminal 1 - Start Backend:
```bash
npm run dev
```

Terminal 2 - Start Frontend:
```bash
npm run client
```

**Option B: Build for Production**

```bash
# Build the frontend
npm run build

# Start the backend (serves the built frontend)
npm start
```

### 7. Access the Application

Open your browser and navigate to:
- Frontend: `http://localhost:3000` (development)
- Backend API: `http://localhost:5000`

## 👤 Default User Setup

Since this is a fresh installation, you'll need to register the first user:

1. Go to `http://localhost:3000/register`
2. Fill in the registration form
3. Choose role: Admin (for full access)
4. Click "Register"

## 📱 Application Structure

```
lawyer-office-saas/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # React components
│       ├── context/       # Auth context
│       ├── App.js         # Main app component
│       └── index.js       # Entry point
├── models/                # Database models
│   ├── User.js           # User model
│   ├── Client.js         # Client model
│   └── Case.js           # Case model
├── routes/               # API routes
│   ├── auth.js          # Authentication routes
│   ├── clients.js       # Client routes
│   └── cases.js         # Case routes
├── middleware/          # Express middleware
│   └── auth.js         # Authentication middleware
├── server.js           # Express server
├── package.json        # Dependencies
└── README.md          # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Cases
- `GET /api/cases` - Get all cases (with filters)
- `GET /api/cases/:id` - Get single case
- `POST /api/cases` - Create new case
- `PUT /api/cases/:id` - Update case
- `DELETE /api/cases/:id` - Delete case
- `POST /api/cases/:id/notes` - Add note to case
- `GET /api/cases/stats/overview` - Get case statistics

## 🎨 User Interface

### Dashboard
- View case statistics
- Recent cases list
- Quick action buttons

### Cases
- List all cases with filtering
- Create new cases
- View case details
- Add notes to cases
- Track case progress

### Clients
- List all clients
- Search functionality
- Create new clients
- View client profiles
- See client's cases

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Role-based access control
- Environment variable configuration

## 🧪 Testing the Application

1. **Register a user**: Create your first admin account
2. **Create a client**: Add a new client with contact information
3. **Create a case**: Link a case to the client you created
4. **Add notes**: Add case notes and track progress
5. **Test filtering**: Use filters to find specific cases
6. **Update status**: Change case status and priority

## 📊 Case Types Supported

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

## 📈 Case Statuses

- Open
- In Progress
- Pending
- Closed
- Won
- Lost
- Settled

## 🎯 Priority Levels

- Low
- Medium
- High
- Urgent

## 🛠️ Customization

### Adding New Case Types

Edit `models/Case.js` and add your case type to the enum:

```javascript
caseType: {
  type: String,
  enum: ['Criminal', 'Civil', 'YourNewType', ...],
  required: true
}
```

### Changing Theme Colors

Edit `client/src/App.css` to modify colors and styling.

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the `MONGODB_URI` in your `.env` file
- Verify MongoDB is accessible at the specified URI

### Port Already in Use
- Change the PORT in `.env` file
- Or stop the process using the port

### Cannot Login
- Verify user exists in database
- Check JWT_SECRET is set correctly
- Clear browser cache and cookies

### Frontend Not Loading
- Ensure backend is running
- Check proxy setting in `client/package.json`
- Run `npm install` in client directory

## 🚀 Production Deployment

### Preparation
1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Use a production MongoDB instance (MongoDB Atlas recommended)
4. Build the frontend: `npm run build`

### Deployment Options
- **Heroku**: Use the Heroku CLI
- **AWS**: EC2 or Elastic Beanstalk
- **DigitalOcean**: App Platform or Droplets
- **Vercel/Netlify**: Frontend only (need separate backend)

## 📝 Future Enhancements

- [ ] Document upload and management
- [ ] Calendar integration for court dates
- [ ] Email notifications
- [ ] Billing and invoicing
- [ ] Time tracking
- [ ] Advanced reporting
- [ ] Client portal
- [ ] Multi-language support

## 📄 License

MIT License - Feel free to use this project for your law office or modify it as needed.

## 👨‍💻 Support

For issues, questions, or contributions:
- Create an issue in the repository
- Contact your development team

## 🙏 Acknowledgments

Built with modern web technologies to help law offices manage their cases efficiently.

---

**Happy Case Managing! ⚖️**
"# dd" 
"# sodo" 
"# sodo" 
