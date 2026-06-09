import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/apiService';
import Loading from '../components/Loading';

const AppointmentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const response = await api.get(`/appointments/${id}`);
        setAppointment(response.data.data);
      } catch (err) {
        setError('Appointment could not be loaded');
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  if (loading) return <Loading />;

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Appointment Details</h2>
          <p className="text-muted">Review appointment information.</p>
        </div>
        <div>
          <Link to="/appointments" className="btn btn-outline-secondary me-2">
            Back to Appointments
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={async () => {
              if (!window.confirm('Delete this appointment?')) return;
              try {
                await api.delete(`/appointments/${id}`);
                navigate('/appointments');
              } catch (err) {
                setError(err.response?.data?.message || 'Unable to delete appointment');
              }
            }}
          >
            Delete Appointment
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card card-shadow p-4">
        <h4>{appointment.customerName}</h4>
        <p>Email: {appointment.customerEmail}</p>
        <p>Phone: {appointment.customerPhone}</p>
        <p>Date: {new Date(appointment.appointmentDate).toLocaleString()}</p>
        <p>Status: <strong className="text-capitalize">{appointment.status}</strong></p>
        <p>Provider: {appointment.providerId?.name || 'Unknown'}</p>
        <p>Specialization: {appointment.providerId?.specialization || 'N/A'}</p>
        <p>Notes: {appointment.notes || 'No additional notes'}</p>
      </div>
    </div>
  );
};

export default AppointmentDetailsPage;
