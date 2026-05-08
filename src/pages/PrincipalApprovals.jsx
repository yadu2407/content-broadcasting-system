import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import contentService from '../services/content.service';
import approvalService from '../services/approval.service';

const PrincipalApprovals = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  useEffect(() => {
    fetchPendingContent();
  }, []);
  
  const fetchPendingContent = async () => {
    try {
      const response = await contentService.getPendingContent();
      setContents(response.contents);
    } catch (error) {
      toast.error('Failed to load pending content');
    } finally {
      setLoading(false);
    }
  };
  
  const handleApprove = async (content) => {
    setProcessing(true);
    try {
      await approvalService.approveContent(content.id);
      toast.success('Content approved successfully');
      fetchPendingContent();
    } catch (error) {
      toast.error('Failed to approve content');
    } finally {
      setProcessing(false);
    }
  };
  
  const handleReject = async (content) => {
    const reason = prompt('Please provide rejection reason:');
    if (!reason || !reason.trim()) {
      toast.error('Rejection reason is required');
      return;
    }
    setProcessing(true);
    try {
      await approvalService.rejectContent(content.id, reason);
      toast.success('Content rejected');
      fetchPendingContent();
    } catch (error) {
      toast.error('Failed to reject content');
    } finally {
      setProcessing(false);
    }
  };
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #7c3aed', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
      </div>
    );
  }
  
  return (
    <div>
      {contents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>No Pending Content</h3>
          <p style={{ color: '#64748b', fontSize: '13px' }}>All content has been reviewed</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {contents.map(content => (
            <div key={content.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <img src={content.fileUrl} alt={content.title} style={{ width: '180px', height: '120px', objectFit: 'cover', borderRadius: '12px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>{content.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Subject: {content.subject}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Teacher: {content.teacherName}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Description: {content.description || 'No description'}</p>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                    <div>Start: {format(new Date(content.startTime), 'MMM dd, yyyy HH:mm')}</div>
                    <div>End: {format(new Date(content.endTime), 'MMM dd, yyyy HH:mm')}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => handleApprove(content)}
                      disabled={processing}
                      style={{ background: '#10b981', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(content)}
                      disabled={processing}
                      style={{ background: '#ef4444', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrincipalApprovals;