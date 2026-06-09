import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/apiService';

const AddProviderPage = () => {
  const [formData, setFormData] = useState({ name: '', specialization: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.specialization || !formData.email || !formData.phone) {
      setError('Please fill all required fields.');
      return;
    }
    try {
      await api.post('/providers', formData);
      navigate('/providers');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create provider');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Add Provider</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card card-shadow p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Specialization</label>
              <input name="specialization" value={formData.specialization} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Create Provider
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProviderPage;
