import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/apiService';

const EditProviderPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', specialization: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProvider = async () => {
      try {
        const response = await api.get(`/providers/${id}`);
        if (response.data.success) {
          setFormData({
            name: response.data.data.name,
            specialization: response.data.data.specialization,
            email: response.data.data.email,
            phone: response.data.data.phone,
          });
        }
      } catch (err) {
        setError('Provider could not be loaded');
      } finally {
        setLoading(false);
      }
    };
    loadProvider();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/providers/${id}`, formData);
      navigate('/providers');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update provider');
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading provider details...</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Edit Provider</h2>
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
            Save Provider
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProviderPage;
