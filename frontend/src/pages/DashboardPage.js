import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';

const DashboardPage = () => {
  const { dashboard, loading } = useContext(AppContext);

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card card-shadow p-4">
              <h5>Total Appointments</h5>
              <p className="display-5">{dashboard.totalAppointments}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-shadow p-4">
              <h5>Total Providers</h5>
              <p className="display-5">{dashboard.totalProviders}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-shadow p-4">
              <h5>Upcoming Appointments</h5>
              <p className="display-5">{dashboard.upcomingAppointments}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
