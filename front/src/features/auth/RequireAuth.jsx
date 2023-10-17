import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { isAuthenticated, rol } = useAuth();

  console.log(rol);

  // Verificar si el usuario está autenticado
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Verificar si el rol del usuario tiene permiso para acceder a la ruta
  if (!allowedRoles.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default RequireAuth;
