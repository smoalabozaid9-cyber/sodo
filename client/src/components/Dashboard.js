import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentCases, setRecentCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, casesRes] = await Promise.all([
        axios.get('/api/cases/stats/overview'),
        axios.get('/api/cases?limit=5')
      ]);
      
      setStats(statsRes.data);
      setRecentCases(casesRes.data.cases.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="container" dir="rtl">
      <div className="page-header">
        <h1>مرحباً بعودتك، {user?.name}! 👋</h1>
        <p>نظرة عامة على مكتب المحاماة الخاص بك</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📂</div>
          <div className="stat-content">
            <h3>{stats?.totalCases || 0}</h3>
            <p>إجمالي القضايا</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{stats?.openCases || 0}</h3>
            <p>القضايا المفتوحة</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>{stats?.inProgressCases || 0}</h3>
            <p>قيد التنفيذ</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats?.closedCases || 0}</h3>
            <p>القضايا المغلقة</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="card">
          <div className="card-header flex-between">
            <h2>القضايا الأخيرة</h2>
            <Link to="/cases/new" className="btn btn-primary">+ قضية جديدة</Link>
          </div>
          
          {recentCases.length === 0 ? (
            <p>لا توجد قضايا. أنشئ قضيتك الأولى!</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>رقم القضية</th>
                  <th>العنوان</th>
                  <th>العميل</th>
                  <th>الحالة</th>
                  <th>الأولوية</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map(caseItem => (
                  <tr key={caseItem._id}>
                    <td>{caseItem.caseNumber}</td>
                    <td>{caseItem.title}</td>
                    <td>{caseItem.client?.firstName} {caseItem.client?.lastName}</td>
                    <td><span className={`badge badge-${caseItem.status.toLowerCase().replace(' ', '-')}`}>{caseItem.status}</span></td>
                    <td><span className={`badge badge-${caseItem.priority.toLowerCase()}`}>{caseItem.priority}</span></td>
                    <td>
                      <Link to={`/cases/${caseItem._id}`} className="btn btn-secondary">عرض</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="quick-actions">
          <h3>إجراءات سريعة</h3>
          <div className="action-buttons">
            <Link to="/cases/new" className="action-btn">
              <span className="action-icon">📄</span>
              <span>قضية جديدة</span>
            </Link>
            <Link to="/clients/new" className="action-btn">
              <span className="action-icon">👤</span>
              <span>عميل جديد</span>
            </Link>
            <Link to="/cases" className="action-btn">
              <span className="action-icon">📊</span>
              <span>عرض جميع القضايا</span>
            </Link>
            <Link to="/clients" className="action-btn">
              <span className="action-icon">👥</span>
              <span>عرض جميع العملاء</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
