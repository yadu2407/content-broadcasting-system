import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await login(data.email, data.password);
      toast.success('Login successful!');
      if (response.user.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/principal/dashboard');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Content Broadcasting</h1>
          <p>Login to your account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              {...register('email')}
              className="login-input"
              placeholder="Email"
            />
            {errors.email && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '-12px', marginBottom: '12px' }}>
                {errors.email.message}
              </p>
            )}
          </div>
          
          <div>
            <input
              type="password"
              {...register('password')}
              className="login-input"
              placeholder="Password"
            />
            {errors.password && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '-12px', marginBottom: '12px' }}>
                {errors.password.message}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>
            Demo Credentials:<br />
            Teacher: teacher@school.com / teacher123<br />
            Principal: principal@school.com / principal123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;