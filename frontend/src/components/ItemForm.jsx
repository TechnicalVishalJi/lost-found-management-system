import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ItemForm = ({ item, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    ItemName: '',
    Description: '',
    Type: 'Lost',
    Location: '',
    Date: new Date().toISOString().split('T')[0],
    ContactInfo: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        Date: new Date(item.Date).toISOString().split('T')[0]
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay fade-in">
      <div className="modal">
        <div className="modal-header">
          <h2>{item ? 'Edit Item' : 'Report Item'}</h2>
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input type="text" name="ItemName" className="form-control" value={formData.ItemName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="Type" className="form-control" value={formData.Type} onChange={handleChange}>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="Description" className="form-control" value={formData.Description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="Location" className="form-control" value={formData.Location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="Date" className="form-control" value={formData.Date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Contact Info</label>
            <input type="text" name="ContactInfo" className="form-control" value={formData.ContactInfo} onChange={handleChange} required />
          </div>
          <div className="mt-4" style={{display: 'flex', gap: '1rem'}}>
            <button type="submit" className="btn btn-primary">{item ? 'Update' : 'Submit'}</button>
            <button type="button" className="btn" onClick={onClose} style={{background: 'var(--border-color)'}}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
