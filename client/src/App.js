import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Cases from './components/Cases';
import CaseDetail from './components/CaseDetail';
import CaseForm from './components/CaseForm';
import Clients from './components/Clients';
import ClientDetail from './components/ClientDetail';
import ClientForm from './components/ClientForm';

// Auth Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        <Route path="/cases" element={<ProtectedRoute><Cases /></ProtectedRoute>} />
        <Route path="/cases/new" element={<ProtectedRoute><CaseForm /></ProtectedRoute>} />
        <Route path="/cases/:id" element={<ProtectedRoute><CaseDetail /></ProtectedRoute>} />
        <Route path="/cases/:id/edit" element={<ProtectedRoute><CaseForm /></ProtectedRoute>} />
        
        <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
        <Route path="/clients/new" element={<ProtectedRoute><ClientForm /></ProtectedRoute>} />
        <Route path="/clients/:id" element={<ProtectedRoute><ClientDetail /></ProtectedRoute>} />
        <Route path="/clients/:id/edit" element={<ProtectedRoute><ClientForm /></ProtectedRoute>} />
        
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
