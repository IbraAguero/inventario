import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = Boolean(token);
  let isTecnico = false;
  let isAdministrador = false;
  let status = 'Empleado';

  if (token) {
    const decoded = jwtDecode(token);
    const { user, rol } = decoded.UserInfo;

    isTecnico = rol === 'Tecnico';
    isAdministrador = rol === 'Administrador';

    if (isTecnico) status = 'Tecnico';
    if (isAdministrador) status = 'Administrador';

    return {
      user,
      rol,
      status,
      isTecnico,
      isAdministrador,
      isAuthenticated,
    };
  }

  return {
    username: '',
    rol: '',
    isTecnico,
    isAdministrador,
    status,
    isAuthenticated,
  };
};
export default useAuth;
