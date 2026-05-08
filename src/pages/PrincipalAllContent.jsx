import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import contentService from '../services/content.service';

const PrincipalAllContent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: 'all', search: '' });
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: debouncedSearch }));
    }, 500);
    return () => clearTimeout(timer);
  }, [debouncedSearch]);
  
  useEffect(() => {
    fetchContent();
  }, [filters]);
  
  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await contentService.getAllContent(filters);
      setContents(response.contents);
    } catch (error) {
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusBadge = (status) => {
    const badges = {
      pending: { background: '#fef3c7', color: '#d97706' },
      approved: { background: '#d1fae5', color: '#059669' },
      rejected: { background: '#fee2e2', color: '#dc2626' }
    };
    return badges[status] || { background: '#f1f5f9', color: '#64748b' };
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
      {/* Filter Bar */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '20px', display: 'flex', gap: '12px', border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', background: 'white' }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        
        <input
          type="text"
          placeholder="Search by title, subject..."
          value={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', minWidth: '180px' }}
        />
      </div>
      
      {/* Table */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        {contents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>No Content Found</h3>
            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>No content matches your filters</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Title</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Subject</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Teacher</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Schedule</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: '600', color: '#475569', fontSize: '12px' }}>Rejection Reason</th>
              </tr>
            </thead>
            <tbody>
              {contents.map(content => {
                const badge = getStatusBadge(content.status);
                return (
                  <tr key={content.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#334155', fontWeight: '500' }}>{content.title}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#334155' }}>{content.subject}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#334155' }}>{content.teacherName}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: badge.background, color: badge.color }}>{content.status}</span>
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

export default PrincipalAllContent;