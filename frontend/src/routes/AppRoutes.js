import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import AddAppointmentPage from '../pages/AddAppointmentPage';
import EditAppointmentPage from '../pages/EditAppointmentPage';
import AppointmentDetailsPage from '../pages/AppointmentDetailsPage';
import ProvidersPage from '../pages/ProvidersPage';
import EditProviderPage from '../pages/EditProviderPage';
import ProviderDetailsPage from '../pages/ProviderDetailsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="appointments/add" element={<AddAppointmentPage />} />
          <Route path="appointments/edit/:id" element={<EditAppointmentPage />} />
          <Route path="appointments/:id" element={<AppointmentDetailsPage />} />
          <Route path="providers" element={<ProvidersPage />} />
          <Route path="providers/edit/:id" element={<EditProviderPage />} />
          <Route path="providers/:id" element={<ProviderDetailsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
