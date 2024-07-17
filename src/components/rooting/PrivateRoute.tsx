import { Navigate, Outlet } from 'react-router-dom';
// import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
// import { AuthUser } from '../../@types/authkit';
import { useAppSelector } from '../../hooks/redux';

const PrivateRoute = () => {
  // const auth = useAuthUser() as AuthUser | null;
  const islogged = useAppSelector((state) => state.user.isLogged);

  if (!islogged) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
