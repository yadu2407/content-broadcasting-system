import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  const teacherLinks = [
    { to: '/teacher/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/teacher/upload', label: 'Upload Content', icon: '📤' },
    { to: '/teacher/my-content', label: 'My Content', icon: '📄' }
  ];
  
  const principalLinks = [
    { to: '/principal/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/principal/approvals', label: 'Pending Approvals', icon: '⏳' },
    { to: '/principal/all-content', label: 'All Content', icon: '📚' }
  ];
  
  const links = user?.role === 'teacher' ? teacherLinks : principalLinks;
  const userName = user?.name || 'User';
  const userRole = user?.role || '';
  
  return (
    <div style={{
      width: '260px',
      background: '#0f172a',
      color: 'white',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      overflowY: 'auto',
      zIndex: 100
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#a855f7' }}>📺 Content System</h2>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
          {userName} ({userRole})
        </p>
      </div>
      
      {/* Navigation Links */}
      <nav style={{ padding: '20px 16px' }}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? 'white' : '#94a3b8',
              background: isActive ? '#7c3aed' : 'transparent',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '6px',
              transition: 'all 0.2s'
            })}
          >
            <span style={{ fontSize: '18px' }}>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Logout Button at Bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '10px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;