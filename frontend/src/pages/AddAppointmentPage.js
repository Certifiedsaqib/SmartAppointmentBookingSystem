import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import api from '../services/apiService';

const AddAppointmentPage = () => {
  const { providers, fetchAppointments } = useContext(AppContext);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    appointmentDate: '',
    providerId: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.appointmentDate || !formData.providerId) {
      setError('Please fill all required fields.');
      return;
    }
    try {
      await api.post('/appointments', formData);
      await fetchAppointments();
      navigate('/appointments');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create appointment');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Add Appointment</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card card-shadow p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Customer Name</label>
              <input name="customerName" value={formData.customerName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Customer Email</label>
              <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Customer Phone</label>
              <input name="customerPhone" value={formData.customerPhone} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Appointment Date</label>
              <input type="datetime-local" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-12">
              <label className="form-label">Provider</label>
              <select name="providerId" value={formData.providerId} onChange={handleChange} className="form-select" required>
                <option value="">Select a provider</option>
                {providers.map((provider) => (
                  <option value={provider._id} key={provider._id}>
                    {provider.name} - {provider.specialization}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} className="form-control" rows="4" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Create Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentPage;
