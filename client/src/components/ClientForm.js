import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    idNumber: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchClient();
    }
  }, [id]);

  const fetchClient = async () => {
    try {
      const response = await axios.get(`/api/clients/${id}`);
      const client = response.data.client;
      
      setFormData({
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
        dateOfBirth: client.dateOfBirth ? client.dateOfBirth.split('T')[0] : '',
        idNumber: client.idNumber || '',
        street: client.address?.street || '',
        city: client.address?.city || '',
        state: client.address?.state || '',
        zipCode: client.address?.zipCode || '',
        country: client.address?.country || '',
        notes: client.notes || ''
      });
    } catch (error) {
      console.error('Error fetching client:', error);
      setError('Failed to load client data');
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

    const submitData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth || undefined,
      idNumber: formData.idNumber,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      notes: formData.notes
    };

    try {
      if (isEditMode) {
        await axios.put(`/api/clients/${id}`, submitData);
      } else {
        await axios.post('/api/clients', submitData);
      }
      navigate('/clients');
    } catch (error) {
      console.error('Error saving client:', error);
      setError(error.response?.data?.message || 'Failed to save client');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>{isEditMode ? 'Edit Client' : 'Create New Client'}</h1>
        <p>{isEditMode ? 'Update client information' : 'Enter client details'}</p>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="client-form">
          <h3>Personal Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="ID/Passport number"
              />
            </div>
          </div>

          <h3>Address</h3>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street address"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
              />
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Zip code"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes about the client"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEditMode ? 'Update Client' : 'Create Client')}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/clients')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientForm;
