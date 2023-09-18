import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};
export default RequireAuth;
