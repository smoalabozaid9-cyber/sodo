import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function CaseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    caseNumber: '',
    title: '',
    description: '',
    client: '',
    caseType: 'Civil',
    status: 'Open',
    priority: 'Medium',
    courtName: '',
    judgeAssigned: '',
    filingDate: '',
    nextHearingDate: '',
    billingAmount: 0
  });

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients();
    if (isEditMode) {
      fetchCase();
    }
  }, [id]);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/api/clients');
      setClients(response.data.clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchCase = async () => {
    try {
      const response = await axios.get(`/api/cases/${id}`);
      const caseData = response.data.case;
      
      setFormData({
        caseNumber: caseData.caseNumber,
        title: caseData.title,
        description: caseData.description,
        client: caseData.client._id,
        caseType: caseData.caseType,
        status: caseData.status,
        priority: caseData.priority,
        courtName: caseData.courtName || '',
        judgeAssigned: caseData.judgeAssigned || '',
        filingDate: caseData.filingDate ? caseData.filingDate.split('T')[0] : '',
        nextHearingDate: caseData.nextHearingDate ? caseData.nextHearingDate.split('T')[0] : '',
        billingAmount: caseData.billingAmount || 0
      });
    } catch (error) {
      console.error('Error fetching case:', error);
      setError('Failed to load case data');
    }
  };

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

    try {
      if (isEditMode) {
        await axios.put(`/api/cases/${id}`, formData);
      } else {
        await axios.post('/api/cases', formData);
      }
      navigate('/cases');
    } catch (error) {
      console.error('Error saving case:', error);
      setError(error.response?.data?.message || 'Failed to save case');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>{isEditMode ? 'Edit Case' : 'Create New Case'}</h1>
        <p>{isEditMode ? 'Update case information' : 'Enter case details'}</p>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="case-form">
          <div className="form-row">
            <div className="form-group">
              <label>Case Number *</label>
              <input
                type="text"
                name="caseNumber"
                value={formData.caseNumber}
                onChange={handleChange}
                required
                disabled={isEditMode}
                placeholder="e.g., CASE-2024-001"
              />
            </div>

            <div className="form-group">
              <label>Case Type *</label>
              <select name="caseType" value={formData.caseType} onChange={handleChange} required>
                <option value="Criminal">Criminal</option>
                <option value="Civil">Civil</option>
                <option value="Family">Family</option>
                <option value="Corporate">Corporate</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Immigration">Immigration</option>
                <option value="Intellectual Property">Intellectual Property</option>
                <option value="Labor">Labor</option>
                <option value="Tax">Tax</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Case Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter case title"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter case description"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Client *</label>
              <select name="client" value={formData.client} onChange={handleChange} required>
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client._id} value={client._id}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
                <option value="Settled">Settled</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Court Name</label>
              <input
                type="text"
                name="courtName"
                value={formData.courtName}
                onChange={handleChange}
                placeholder="Enter court name"
              />
            </div>

            <div className="form-group">
              <label>Judge Assigned</label>
              <input
                type="text"
                name="judgeAssigned"
                value={formData.judgeAssigned}
                onChange={handleChange}
                placeholder="Enter judge name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Filing Date</label>
              <input
                type="date"
                name="filingDate"
                value={formData.filingDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Next Hearing Date</label>
              <input
                type="date"
                name="nextHearingDate"
                value={formData.nextHearingDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Billing Amount ($)</label>
              <input
                type="number"
                name="billingAmount"
                value={formData.billingAmount}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEditMode ? 'Update Case' : 'Create Case')}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/cases')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CaseForm;
