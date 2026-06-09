import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import api from '../services/apiService';

const EditAppointmentPage = () => {
  const { providers } = useContext(AppContext);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    appointmentDate: '',
    providerId: '',
    notes: '',
    status: 'pending',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const response = await api.get(`/appointments/${id}`);
        if (response.data.success) {
          const appointment = response.data.data;
          setFormData({
            customerName: appointment.customerName,
            customerEmail: appointment.customerEmail,
            customerPhone: appointment.customerPhone,
            appointmentDate: appointment.appointmentDate.slice(0, 16),
            providerId: appointment.providerId?._id || '',
            notes: appointment.notes || '',
            status: appointment.status,
          });
        }
      } catch (err) {
        setError('Unable to load appointment details');
      }
    };
    loadAppointment();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/appointments/${id}`, formData);
      navigate('/appointments');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update appointment');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Edit Appointment</h2>
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
            <div className="col-md-4">
              <label className="form-label">Provider</label>
              <select name="providerId" value={formData.providerId} onChange={handleChange} className="form-select" required>
                <option value="">Select a provider</option>
                {providers.map((provider) => (
                  <option value={provider._id} key={provider._id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="form-select">
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} className="form-control" rows="4" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentPage;
