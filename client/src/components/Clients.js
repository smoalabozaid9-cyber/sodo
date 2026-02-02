import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './List.css';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/api/clients');
      setClients(response.data.clients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`/api/clients/${id}`);
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Failed to delete client');
      }
    }
  };

  const filteredClients = clients.filter(client =>
    `${client.firstName} ${client.lastName} ${client.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">جاري تحميل العملاء...</div>;
  }

  return (
    <div className="container" dir="rtl">
      <div className="page-header flex-between">
        <div>
          <h1>العملاء</h1>
          <p>إدارة جميع العملاء</p>
        </div>
        <Link to="/clients/new" className="btn btn-primary">+ عميل جديد</Link>
      </div>

      <div className="filters card">
        <div className="form-group">
          <input
            type="text"
            placeholder="البحث عن عملاء بالاسم أو البريد الإلكتروني..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <div className="card text-center">
          <p>لا يوجد عملاء. {searchTerm ? 'حاول البحث بطريقة أخرى.' : 'أنشئ عميلك الأول!'}</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>الهاتف</th>
                <th>المدينة</th>
                <th>تاريخ الإنشاء</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client._id}>
                  <td><strong>{client.firstName} {client.lastName}</strong></td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.address?.city || 'غير متوفر'}</td>
                  <td>{new Date(client.createdAt).toLocaleDateString('ar-SA')}</td>
                  <td>
                    <div className="action-buttons-inline">
                      <Link to={`/clients/${client._id}`} className="btn btn-secondary">عرض</Link>
                      <Link to={`/clients/${client._id}/edit`} className="btn btn-primary">تعديل</Link>
                      <button onClick={() => handleDelete(client._id)} className="btn btn-danger">حذف</button>
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

export default Clients;
