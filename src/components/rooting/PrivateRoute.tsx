import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const PrivateRoute = () => {
  const islogged = useAppSelector((state) => state.user.isLogged);

  if (!islogged) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
