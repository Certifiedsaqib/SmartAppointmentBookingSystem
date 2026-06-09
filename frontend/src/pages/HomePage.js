import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="hero-section py-3 text-center">
      <div className="hero-intro mx-auto">
        <span className="feature-badge">Fast, simple, and reliable</span>
        <h1 className="home-title">Smart Appointment Booking System</h1>
        <p className="lead home-copy text-secondary mx-auto">
          Schedule appointments with ease for doctors, consultants, tutors, and service providers.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4 home-actions">
          <Link to="/appointments" className="btn btn-primary btn-lg">
            Book an Appointment
          </Link>
          <Link to="/providers" className="btn btn-outline-primary btn-lg">
            Browse Providers
          </Link>
        </div>
      </div>

      <div className="row g-4 mt-4 justify-content-center w-100">
        <div className="col-lg-8">
          <div className="card p-4 bg-white border-0 hero-highlight card-shadow text-start">
            <h3 className="home-card-title">Why choose Smart Booking?</h3>
            <p className="text-muted mb-3">Everything you need for a polished booking experience.</p>
            <ul className="list-unstyled feature-list mb-0">
              <li>Fast appointment scheduling</li>
              <li>Provider and customer management</li>
              <li>Search, filter, and dashboard statistics</li>
              <li>Responsive interface for all devices</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-5 w-100">
        <h2 className="section-title">Core Features</h2>
        <p className="text-muted mb-4">A clean overview of the most useful tools in the platform.</p>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card card-shadow feature-card p-4 h-100">
              <h5>Appointment Management</h5>
              <p>View, create, update, and delete appointments quickly.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-shadow feature-card p-4 h-100">
              <h5>Provider Database</h5>
              <p>Manage service providers with detailed contact information.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-shadow feature-card p-4 h-100">
              <h5>Smart Filtering</h5>
              <p>Search by customer name, provider, or appointment date.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
