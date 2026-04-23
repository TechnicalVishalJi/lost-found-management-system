import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ Name: '', Email: '', Password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await api.post('/register', formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card">
        <h2>Create Account</h2>
        {error && <div className="mb-4 text-center text-danger fade-in">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="Name" 
              className="form-control" 
              value={formData.Name} 
              onChange={handleChange} 
              required 
            />
          </div>
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
          <button type="submit" className="btn btn-primary mt-4">Register</button>
        </form>
        <div className="text-center mt-4">
          <span style={{color: 'var(--text-light)'}}>Already have an account? </span>
          <Link to="/" className="auth-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
