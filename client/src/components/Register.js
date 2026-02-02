import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'lawyer',
    phone: '',
    barNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container" dir="rtl">
      <div className="auth-card">
        <h1 className="auth-title">⚖️ نظام إدارة مكتب المحاماة</h1>
        <h2>التسجيل</h2>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>الاسم الكامل</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="أدخل اسمك الكامل"
            />
          </div>
          
          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="أدخل بريدك الإلكتروني"
            />
          </div>
          
          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="6 أحرف على الأقل"
            />
          </div>
          
          <div className="form-group">
            <label>الدور الوظيفي</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="lawyer">محامي</option>
              <option value="paralegal">مساعد قانوني</option>
              <option value="admin">مدير النظام</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>رقم الهاتف (اختياري)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="أدخل رقم هاتفك"
            />
          </div>
          
          <div className="form-group">
            <label>رقم الترخيص (اختياري)</label>
            <input
              type="text"
              name="barNumber"
              value={formData.barNumber}
              onChange={handleChange}
              placeholder="أدخل رقم الترخيص"
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'جاري التسجيل...' : 'تسجيل'}
          </button>
        </form>
        
        <p className="auth-footer">
          لديك حساب بالفعل؟ <Link to="/login">سجل دخولك هنا</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
