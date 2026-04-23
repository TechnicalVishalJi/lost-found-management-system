import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ Email: '', Password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const res = await api.post('/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        {error && <div className="mb-4 text-center text-danger fade-in">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="Email" 
              className="form-control" 
              value={formData.Email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="Password" 
              className="form-control" 
              value={formData.Password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4">Login</button>
        </form>
        <div className="text-center mt-4">
          <span style={{color: 'var(--text-light)'}}>Don't have an account? </span>
          <Link to="/register" className="auth-link">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
