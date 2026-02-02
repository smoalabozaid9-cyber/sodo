import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" dir="rtl">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          ⚖️ نظام إدارة مكتب المحاماة
        </Link>
        
        <ul className="navbar-menu">
          <li><Link to="/dashboard">لوحة التحكم</Link></li>
          <li><Link to="/cases">القضايا</Link></li>
          <li><Link to="/clients">العملاء</Link></li>
        </ul>
        
        <div className="navbar-user">
          <span className="user-name">👤 {user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">تسجيل الخروج</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
