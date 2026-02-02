import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Detail.css';

function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteContent, setNoteContent] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    fetchCase();
  }, [id]);

  const fetchCase = async () => {
    try {
      const response = await axios.get(`/api/cases/${id}`);
      setCaseData(response.data.case);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching case:', error);
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    setAddingNote(true);
    try {
      await axios.post(`/api/cases/${id}/notes`, { content: noteContent });
      setNoteContent('');
      fetchCase();
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note');
    }
    setAddingNote(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this case?')) {
      try {
        await axios.delete(`/api/cases/${id}`);
        navigate('/cases');
      } catch (error) {
        console.error('Error deleting case:', error);
        alert('Failed to delete case');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading case details...</div>;
  }

  if (!caseData) {
    return <div className="container"><div className="error">Case not found</div></div>;
  }

  return (
    <div className="container">
      <div className="page-header flex-between">
        <div>
          <h1>{caseData.title}</h1>
          <p>Case #{caseData.caseNumber}</p>
        </div>
        <div className="flex gap-10">
          <Link to={`/cases/${id}/edit`} className="btn btn-primary">Edit Case</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete Case</button>
          <Link to="/cases" className="btn btn-secondary">Back to Cases</Link>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="card">
            <div className="card-header">
              <h2>Case Information</h2>
            </div>
            
            <div className="info-grid">
              <div className="info-item">
                <label>Status</label>
                <span className={`badge badge-${caseData.status.toLowerCase().replace(' ', '-')}`}>
                  {caseData.status}
                </span>
              </div>
              
              <div className="info-item">
                <label>Priority</label>
                <span className={`badge badge-${caseData.priority.toLowerCase()}`}>
                  {caseData.priority}
                </span>
              </div>
              
              <div className="info-item">
                <label>Case Type</label>
                <span>{caseData.caseType}</span>
              </div>
              
              <div className="info-item">
                <label>Court Name</label>
                <span>{caseData.courtName || 'N/A'}</span>
              </div>
              
              <div className="info-item">
                <label>Judge Assigned</label>
                <span>{caseData.judgeAssigned || 'N/A'}</span>
              </div>
              
              <div className="info-item">
                <label>Filing Date</label>
                <span>{caseData.filingDate ? new Date(caseData.filingDate).toLocaleDateString() : 'N/A'}</span>
              </div>
              
              <div className="info-item">
                <label>Next Hearing</label>
                <span>{caseData.nextHearingDate ? new Date(caseData.nextHearingDate).toLocaleDateString() : 'N/A'}</span>
              </div>
              
              <div className="info-item">
                <label>Billing Amount</label>
                <span>${caseData.billingAmount?.toLocaleString() || 0}</span>
              </div>
            </div>
            
            <div className="info-item full-width">
              <label>Description</label>
              <p>{caseData.description}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Notes</h2>
            </div>
            
            <form onSubmit={handleAddNote} className="note-form">
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Add a note..."
                rows="3"
              />
              <button type="submit" className="btn btn-primary" disabled={addingNote}>
                {addingNote ? 'Adding...' : 'Add Note'}
              </button>
            </form>
            
            <div className="notes-list">
              {caseData.notes && caseData.notes.length > 0 ? (
                caseData.notes.map((note, index) => (
                  <div key={index} className="note-item">
                    <p>{note.content}</p>
                    <div className="note-meta">
                      <span>By: {note.addedBy?.name}</span>
                      <span>{new Date(note.addedAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No notes yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="card">
            <div className="card-header">
              <h3>Client Information</h3>
            </div>
            {caseData.client ? (
              <>
                <div className="info-item">
                  <label>Name</label>
                  <span>{caseData.client.firstName} {caseData.client.lastName}</span>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <span>{caseData.client.email}</span>
                </div>
                <div className="info-item">
                  <label>Phone</label>
                  <span>{caseData.client.phone}</span>
                </div>
                {caseData.client.address && (
                  <div className="info-item">
                    <label>Address</label>
                    <span>
                      {caseData.client.address.street}<br />
                      {caseData.client.address.city}, {caseData.client.address.state} {caseData.client.address.zipCode}
                    </span>
                  </div>
                )}
                <Link to={`/clients/${caseData.client._id}`} className="btn btn-secondary btn-block">
                  View Client Profile
                </Link>
              </>
            ) : (
              <p>No client information</p>
            )}
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Assigned Lawyer</h3>
            </div>
            {caseData.assignedLawyer && (
              <>
                <div className="info-item">
                  <label>Name</label>
                  <span>{caseData.assignedLawyer.name}</span>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <span>{caseData.assignedLawyer.email}</span>
                </div>
                {caseData.assignedLawyer.phone && (
                  <div className="info-item">
                    <label>Phone</label>
                    <span>{caseData.assignedLawyer.phone}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseDetail;
