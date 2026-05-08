import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import contentService from '../services/content.service';

const TeacherMyContent = () => {
  const { user } = useAuth();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchContent();
  }, []);
  
  const fetchContent = async () => {
    try {
      const response = await contentService.getTeacherContent(user.id);
      setContents(response.contents);
    } catch (error) {
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusBadge = (status) => {
    const badges = {
      pending: { background: '#fef3c7', color: '#d97706', label: 'Pending' },
      approved: { background: '#d1fae5', color: '#059669', label: 'Approved' },
      rejected: { background: '#fee2e2', color: '#dc2626', label: 'Rejected' }
    };
    return badges[status] || { background: '#f1f5f9', color: '#64748b', label: status };
  };
  
  const getScheduleStatus = (content) => {
    const now = new Date();
    const start = new Date(content.startTime);
    const end = new Date(content.endTime);
    
    if (content.status !== 'approved') return null;
    if (now < start) return { background: '#dbeafe', color: '#2563eb', label: 'Scheduled' };
    if (now > end) return { background: '#f1f5f9', color: '#64748b', label: 'Expired' };
    return { background: '#dcfce7', color: '#16a34a', label: 'Active' };
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
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        {contents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>No Content Yet</h3>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>Start by uploading your first content</p>
            <a href="/teacher/upload" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', padding: '8px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>Upload Content</a>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Title</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Subject</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Preview</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Schedule</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Rejection Reason</th>
              </tr>
            </thead>
            <tbody>
              {contents.map(content => {
                const statusBadge = getStatusBadge(content.status);
                const scheduleStatus = getScheduleStatus(content);
                return (
                  <tr key={content.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#334155', fontWeight: '500' }}>{content.title}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#334155' }}>{content.subject}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <img src={content.fileUrl} alt={content.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: statusBadge.background, color: statusBadge.color }}>{statusBadge.label}</span>
                      {scheduleStatus && (
                        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', marginLeft: '6px', background: scheduleStatus.background, color: scheduleStatus.color }}>{scheduleStatus.label}</span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b' }}>
                      <div>Start: {format(new Date(content.startTime), 'MMM dd, HH:mm')}</div>
                      <div>End: {format(new Date(content.endTime), 'MMM dd, HH:mm')}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#dc2626' }}>{content.rejectionReason || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TeacherMyContent;