import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/apiService';
import Loading from '../components/Loading';

const ProviderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProvider = async () => {
      try {
        const response = await api.get(`/providers/${id}`);
        setProvider(response.data.data);
      } catch (err) {
        setError('Provider could not be loaded');
      } finally {
        setLoading(false);
      }
    };
    loadProvider();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Provider Details</h2>
          <p className="text-muted">View profile information and contact details.</p>
        </div>
        <div>
          <Link to="/providers" className="btn btn-outline-secondary me-2">
            Back to Providers
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={async () => {
              if (!window.confirm('Delete this provider?')) return;
              try {
                await api.delete(`/providers/${id}`);
                navigate('/providers');
              } catch (err) {
                setError(err.response?.data?.message || 'Unable to delete provider');
              }
            }}
          >
            Delete Provider
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card card-shadow p-4">
        <h4>{provider.name}</h4>
        <p>Specialization: {provider.specialization}</p>
        <p>Email: {provider.email}</p>
        <p>Phone: {provider.phone}</p>
      </div>
    </div>
  );
};

export default ProviderDetailsPage;
