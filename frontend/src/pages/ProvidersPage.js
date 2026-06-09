import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import api from '../services/apiService';

const ProvidersPage = () => {
  const { providers, loading, fetchProviders } = useContext(AppContext);
  const [error, setError] = useState('');
  const [counts, setCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState({});

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this provider?')) return;
    try {
      setError('');
      await api.delete(`/providers/${id}`);
      fetchProviders();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete provider');
    }
  };

  const handleCountClick = async (id) => {
    try {
      setLoadingCounts((prev) => ({ ...prev, [id]: true }));
      const response = await api.get(`/providers/${id}/appointment-count`);
      setCounts((prev) => ({ ...prev, [id]: response.data?.data?.count ?? 0 }));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load appointment count');
    } finally {
      setLoadingCounts((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2>Providers</h2>
        <p className="text-muted">Service providers are built in and ready to use. View provider profiles below.</p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row g-4">
          {providers.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No providers found.</div>
            </div>
          ) : (
            providers.map((provider) => (
              <div className="col-md-4" key={provider._id}>
                <div className="card card-shadow h-100 p-4">
                  <h5>{provider.name}</h5>
                  <p className="mb-1">{provider.specialization}</p>
                  <p className="mb-1">{provider.email}</p>
                  <p className="mb-3">{provider.phone}</p>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-info me-2 mb-2"
                    onClick={() => handleCountClick(provider._id)}
                    disabled={loadingCounts[provider._id]}
                  >
                    {loadingCounts[provider._id]
                      ? 'Loading...'
                      : counts[provider._id] !== undefined
                        ? `Appointments: ${counts[provider._id]}`
                        : 'Show appointment count'}
                  </button>
                  <Link to={`/providers/${provider._id}`} className="btn btn-outline-primary btn-sm me-2 mb-2">
                    View
                  </Link>
                  <Link to={`/providers/edit/${provider._id}`} className="btn btn-outline-secondary btn-sm me-2 mb-2">
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mb-2"
                    onClick={() => handleDelete(provider._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProvidersPage;
