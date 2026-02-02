import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './List.css';

function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    caseType: '',
    priority: ''
  });

  useEffect(() => {
    fetchCases();
  }, [filters]);

  const fetchCases = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.caseType) queryParams.append('caseType', filters.caseType);
      if (filters.priority) queryParams.append('priority', filters.priority);

      const response = await axios.get(`/api/cases?${queryParams}`);
      setCases(response.data.cases);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cases:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this case?')) {
      try {
        await axios.delete(`/api/cases/${id}`);
        fetchCases();
      } catch (error) {
        console.error('Error deleting case:', error);
        alert('Failed to delete case');
      }
    }
  };

  if (loading) {
    return <div className="loading">جاري تحميل القضايا...</div>;
  }

  return (
    <div className="container" dir="rtl">
      <div className="page-header flex-between">
        <div>
          <h1>القضايا</h1>
          <p>إدارة جميع القضايا القانونية</p>
        </div>
        <Link to="/cases/new" className="btn btn-primary">+ قضية جديدة</Link>
      </div>

      <div className="filters card">
        <div className="filters-grid">
          <div className="form-group">
            <label>الحالة</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">جميع الحالات</option>
              <option value="Open">مفتوحة</option>
              <option value="In Progress">قيد التنفيذ</option>
              <option value="Pending">معلقة</option>
              <option value="Closed">مغلقة</option>
              <option value="Won">مكسوبة</option>
              <option value="Lost">خاسرة</option>
              <option value="Settled">تسوية</option>
            </select>
          </div>

          <div className="form-group">
            <label>نوع القضية</label>
            <select name="caseType" value={filters.caseType} onChange={handleFilterChange}>
              <option value="">جميع الأنواع</option>
              <option value="Criminal">جنائية</option>
              <option value="Civil">مدنية</option>
              <option value="Family">أحوال شخصية</option>
              <option value="Corporate">تجارية</option>
              <option value="Real Estate">عقارية</option>
              <option value="Immigration">هجرة</option>
              <option value="Intellectual Property">ملكية فكرية</option>
              <option value="Labor">عمالية</option>
              <option value="Tax">ضريبية</option>
              <option value="Other">أخرى</option>
            </select>
          </div>

          <div className="form-group">
            <label>الأولوية</label>
            <select name="priority" value={filters.priority} onChange={handleFilterChange}>
              <option value="">جميع الأولويات</option>
              <option value="Low">منخفضة</option>
              <option value="Medium">متوسطة</option>
              <option value="High">عالية</option>
              <option value="Urgent">عاجلة</option>
            </select>
          </div>
        </div>
      </div>

      {cases.length === 0 ? (
        <div className="card text-center">
          <p>لا توجد قضايا. أنشئ قضيتك الأولى!</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>رقم القضية</th>
                <th>العنوان</th>
                <th>العميل</th>
                <th>النوع</th>
                <th>الحالة</th>
                <th>الأولوية</th>
                <th>المحامي</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {cases.map(caseItem => (
                <tr key={caseItem._id}>
                  <td><strong>{caseItem.caseNumber}</strong></td>
                  <td>{caseItem.title}</td>
                  <td>{caseItem.client?.firstName} {caseItem.client?.lastName}</td>
                  <td>{caseItem.caseType}</td>
                  <td><span className={`badge badge-${caseItem.status.toLowerCase().replace(' ', '-')}`}>{caseItem.status}</span></td>
                  <td><span className={`badge badge-${caseItem.priority.toLowerCase()}`}>{caseItem.priority}</span></td>
                  <td>{caseItem.assignedLawyer?.name}</td>
                  <td>
                    <div className="action-buttons-inline">
                      <Link to={`/cases/${caseItem._id}`} className="btn btn-secondary">عرض</Link>
                      <Link to={`/cases/${caseItem._id}/edit`} className="btn btn-primary">تعديل</Link>
                      <button onClick={() => handleDelete(caseItem._id)} className="btn btn-danger">حذف</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Cases;
