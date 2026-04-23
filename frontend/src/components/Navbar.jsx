import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-brand">
          <Package color="var(--primary-color)" />
          <span>CampusFound</span>
        </div>
        <div className="navbar-actions">
          {user && <span style={{ fontWeight: 600 }}>Hi, {user.Name}</span>}
          <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-main)' }}>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
