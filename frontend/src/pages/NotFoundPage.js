import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="text-center py-5">
      <h2>Page Not Found</h2>
      <p className="text-muted">The page you are looking for does not exist.</p>
      <Link className="btn btn-primary" to="/">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
