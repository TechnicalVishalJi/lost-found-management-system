import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import ItemForm from '../components/ItemForm';
import api from '../services/api';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/items/search?name=${searchTerm}`);
      setItems(res.data);
    } catch (err) {
      console.error('Error searching:', err);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingItem) {
        await api.put(`/items/${editingItem._id}`, formData);
      } else {
        await api.post('/items', formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error('Error saving item:', err);
      alert(err.response?.data?.message || 'Error saving item');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/items/${id}`);
        fetchItems();
      } catch (err) {
        console.error('Error deleting item:', err);
        alert(err.response?.data?.message || 'Error deleting item');
      }
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Navbar />
      
      <main className="container fade-in" style={{flex: 1}}>
        <div className="dashboard-header">
          <form className="search-bar" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search items by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{width: 'auto', padding: '0.75rem'}}>
              <Search size={20} />
            </button>
          </form>
          
          <button className="btn btn-primary" style={{width: 'auto', gap: '0.5rem'}} onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>
            <Plus size={20} /> Report Item
          </button>
        </div>

        <div className="items-grid">
          {items.map(item => (
            <ItemCard 
              key={item._id} 
              item={item} 
              currentUser={currentUser} 
              onEdit={(i) => { setEditingItem(i); setIsModalOpen(true); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
        
        {items.length === 0 && (
          <div className="text-center" style={{color: 'var(--text-light)', marginTop: '3rem'}}>
            <h3>No items found</h3>
          </div>
        )}
      </main>

      {isModalOpen && (
        <ItemForm 
          item={editingItem} 
          onSubmit={handleCreateOrUpdate} 
          onClose={() => { setIsModalOpen(false); setEditingItem(null); }} 
        />
      )}
    </div>
  );
};

export default Dashboard;
