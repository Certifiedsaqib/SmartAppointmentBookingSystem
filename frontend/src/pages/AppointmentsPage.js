import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import api from '../services/apiService';

const AppointmentsPage = () => {
  const {
    appointments,
    providers,
    loading,
    searchQuery,
    setSearchQuery,
    providerFilter,
    setProviderFilter,
    dateFilter,
    setDateFilter,
    fetchAppointments,
  } = useContext(AppContext);
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      setError('');
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete appointment');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Appointments</h2>
          <p className="text-muted">Manage bookings, filter results, and view appointment details.</p>
        </div>
        <Link to="/appointments/add" className="btn btn-primary">
          Add Appointment
        </Link>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name"
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
          >
            <option value="">Filter by provider</option>
            {providers.map((provider) => (
              <option value={provider._id} key={provider._id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <Loading />
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Provider</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.customerName}</td>
                    <td>{appointment.providerId?.name || 'Unknown'}</td>
                    <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                    <td className="text-capitalize">{appointment.status}</td>
                    <td>
                      <Link
                        to={`/appointments/${appointment._id}`}
                        className="btn btn-sm btn-outline-secondary me-2"
                      >
                        View
                      </Link>
                      <Link
                        to={`/appointments/edit/${appointment._id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(appointment._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
