import React, { useState, useEffect } from 'react';
import { User, Plus, Edit2, Trash2, Mail, Phone, MapPin, Search, LogOut } from 'lucide-react';
import axios from 'axios';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginRegister from './components/LoginRegister';
import './App.css';

const API_URL = 'http://localhost:5001/api';

function ContactManager() {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
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

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_URL}/contacts/${id}`);
        fetchContacts();
        resetForm(); // Close the modal after deletion
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
      phone: contact.phone || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '' });
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
        <div className="dashboard-header">
          <div className="brand">
            <User className="brand-icon" size={24} />
            <h1 className="brand-title">ContactManager</h1>
          </div>
          <div className="header-right">
            <div className="header-search">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="user-info">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <div className="user-details">
                <span className="username">{user.username}</span>
              </div>
            </div>
            <button onClick={logout} className="logout-button">
              <LogOut size={16} />
            </button>
          </div>
        </div>


        <div className="dashboard-section">
          <div className="dashboard-title">
            <h2>Dashboard</h2>
            <button
              onClick={() => setShowForm(true)}
              className="add-contact-button"
            >
              Add Contact
            </button>
          </div>
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
                <div className="form-buttons">
                  <button type="submit" className="save-button">
                    {editingContact ? 'Update' : 'Save'}
                  </button>
                  <button type="button" onClick={resetForm} className="cancel-button">
                    Cancel
                  </button>
                  {editingContact && (
                    <button 
                      type="button" 
                      onClick={() => handleDeleteContact(editingContact.id)} 
                      className="delete-button"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="contacts-table-container">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr 
                  key={contact.id} 
                  onClick={() => editContact(contact)}
                  className="clickable-row"
                >
                  <td>
                    <div className="contact-name-cell">
                      <div className="contact-avatar-small">
                        <User size={16} />
                      </div>
                      <span>{contact.name}</span>
                    </div>
                  </td>
                  <td>{contact.phone || '-'}</td>
                  <td>{contact.email || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginRegister />;
  }

  return <ContactManager />;
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;
