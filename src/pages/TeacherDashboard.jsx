import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import contentService from '../services/content.service';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  const fetchStats = async () => {
    try {
      const response = await contentService.getDashboardStats(user.id);
      setStats(response.stats);
    } catch (error) {
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };
  
  const statCards = [
    { title: 'Total Uploads', value: stats.total, color: '#3b82f6', icon: '📊' },
    { title: 'Pending', value: stats.pending, color: '#eab308', icon: '⏳' },
    { title: 'Approved', value: stats.approved, color: '#22c55e', icon: '✓' },
    { title: 'Rejected', value: stats.rejected, color: '#ef4444', icon: '✗' }
  ];
  
  if (loading) {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '260px', flex: 1, padding: '24px' }}>
          <Navbar title="Teacher Dashboard" />
          <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #7c3aed', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', flex: 1, padding: '24px', minHeight: '100vh', background: '#f8fafc' }}>
        <Navbar title="Teacher Dashboard" />
        
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {statCards.map((stat, index) => (
            <div key={index} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>{stat.title}</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1e293b' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <Link to="/teacher/upload" style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', textDecoration: 'none', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📤</div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>Upload New Content</h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>Share educational materials</p>
            </Link>
            <Link to="/teacher/my-content" style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', textDecoration: 'none', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📄</div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>View My Content</h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>Track all your submissions</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;