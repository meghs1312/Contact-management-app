import React, { useState, useEffect } from 'react';
import { User, Plus, Edit2, Trash2, Mail, Phone, MapPin, Search } from 'lucide-react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5001/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await axios.put(`${API_URL}/contacts/${editingContact.id}`, formData);
      } else {
        await axios.post(`${API_URL}/contacts`, formData);
      }
      fetchContacts();
      resetForm();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_URL}/contacts/${id}`);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const editContact = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email || '',
      phone: contact.phone || '',
      address: contact.address || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', address: '' });
    setEditingContact(null);
    setShowForm(false);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (contact.phone && contact.phone.includes(searchTerm))
  );

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1 className="title">
            <User className="title-icon" size={40} />
            Contact Manager
          </h1>
          <p className="subtitle">Manage your contacts easily and efficiently</p>
        </div>

        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="add-button"
          >
            <Plus size={20} />
            Add Contact
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h2 className="modal-title">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows="2"
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="save-button">
                    {editingContact ? 'Update' : 'Save'}
                  </button>
                  <button type="button" onClick={resetForm} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="contacts-grid">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="contact-card">
              <div className="contact-header">
                <div className="contact-info">
                  <div className="contact-avatar">
                    <User size={24} />
                  </div>
                  <h3 className="contact-name">{contact.name}</h3>
                </div>
                <div className="contact-actions">
                  <button
                    onClick={() => editContact(contact)}
                    className="edit-button"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="delete-button"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="contact-details">
                {contact.email && (
                  <div className="contact-detail">
                    <Mail size={16} />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="contact-detail">
                    <Phone size={16} />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.address && (
                  <div className="contact-detail">
                    <MapPin size={16} />
                    <span>{contact.address}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="empty-state">
            <User size={64} />
            <h3>No contacts found</h3>
            <p>
              {searchTerm ? 'Try adjusting your search terms' : 'Add your first contact to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
