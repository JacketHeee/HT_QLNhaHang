// src/components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const routes = localStorage.getItem('routes');

  if (!token || !routes) {
    return <Navigate to="/admin/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;