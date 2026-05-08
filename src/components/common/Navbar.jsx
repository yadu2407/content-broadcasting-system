import React from 'react';

const Navbar = ({ title }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '16px 24px',
      marginBottom: '24px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0'
    }}>
      <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#1e293b' }}>{title}</h1>
    </div>
  );
};

export default Navbar;