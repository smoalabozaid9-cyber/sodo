import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Detail.css';

function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientData();
  }, [id]);

  const fetchClientData = async () => {
    try {
      const [clientRes, casesRes] = await Promise.all([
        axios.get(`/api/clients/${id}`),
        axios.get('/api/cases')
      ]);
      
      setClient(clientRes.data.client);
      // Filter cases for this client
      const clientCases = casesRes.data.cases.filter(c => c.client._id === id);
      setCases(clientCases);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching client data:', error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`/api/clients/${id}`);
        navigate('/clients');
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Failed to delete client');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading client details...</div>;
  }

  if (!client) {
    return <div className="container"><div className="error">Client not found</div></div>;
  }

  return (
    <div className="container">
      <div className="page-header flex-between">
        <div>
          <h1>{client.firstName} {client.lastName}</h1>
          <p>Client Information</p>
        </div>
        <div className="flex gap-10">
          <Link to={`/clients/${id}/edit`} className="btn btn-primary">Edit Client</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete Client</button>
          <Link to="/clients" className="btn btn-secondary">Back to Clients</Link>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="card">
            <div className="card-header">
              <h2>Personal Information</h2>
            </div>
            
            <div className="info-grid">
              <div className="info-item">
                <label>First Name</label>
                <span>{client.firstName}</span>
              </div>
              
              <div className="info-item">
                <label>Last Name</label>
                <span>{client.lastName}</span>
              </div>
              
              <div className="info-item">
                <label>Email</label>
                <span>{client.email}</span>
              </div>
              
              <div className="info-item">
                <label>Phone</label>
                <span>{client.phone}</span>
              </div>
              
              <div className="info-item">
                <label>Date of Birth</label>
                <span>{client.dateOfBirth ? new Date(client.dateOfBirth).toLocaleDateString() : 'N/A'}</span>
              </div>
              
              <div className="info-item">
                <label>ID Number</label>
                <span>{client.idNumber || 'N/A'}</span>
              </div>
            </div>
            
            {client.address && (
              <div className="info-item full-width">
                <label>Address</label>
                <span>
                  {client.address.street && `${client.address.street}, `}
                  {client.address.city && `${client.address.city}, `}
                  {client.address.state && `${client.address.state} `}
                  {client.address.zipCode && client.address.zipCode}
                  {client.address.country && `, ${client.address.country}`}
                </span>
              </div>
            )}
            
            {client.notes && (
              <div className="info-item full-width">
                <label>Notes</label>
                <p>{client.notes}</p>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-header flex-between">
              <h2>Cases ({cases.length})</h2>
              <Link to="/cases/new" className="btn btn-primary">+ New Case</Link>
            </div>
            
            {cases.length === 0 ? (
              <p>No cases for this client yet.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Case Number</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map(caseItem => (
                    <tr key={caseItem._id}>
                      <td><strong>{caseItem.caseNumber}</strong></td>
                      <td>{caseItem.title}</td>
                      <td>{caseItem.caseType}</td>
                      <td>
                        <span className={`badge badge-${caseItem.status.toLowerCase().replace(' ', '-')}`}>
                          {caseItem.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/cases/${caseItem._id}`} className="btn btn-secondary">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="card">
            <div className="card-header">
              <h3>Quick Stats</h3>
            </div>
            <div className="info-item">
              <label>Total Cases</label>
              <span>{cases.length}</span>
            </div>
            <div className="info-item">
              <label>Open Cases</label>
              <span>{cases.filter(c => c.status === 'Open').length}</span>
            </div>
            <div className="info-item">
              <label>Closed Cases</label>
              <span>{cases.filter(c => c.status === 'Closed').length}</span>
            </div>
            <div className="info-item">
              <label>Client Since</label>
              <span>{new Date(client.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;
