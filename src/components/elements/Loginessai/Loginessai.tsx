import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';
import { fetchUser } from '../../../store/reducers/userReducer';
import './style.scss';

function Login() {
  console.log('composant login ok');

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('dispatching fetchUser');
    dispatch(fetchUser());
  }, [dispatch]);

  const data = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  console.log('console log de data apres state:', data);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(data)) {
    return <div>Data n'est pas un tableau</div>;
  }

  if (data.length === 0) {
    return <div>Aucun utilisateur trouvé</div>;
  }

  return (
    <div className="Data">
      <ul className="LiData">
        {data.map((user) => (
          <li key={user.id}>{user.pseudo}</li>
        ))}
        <li> TEST</li>
      </ul>
    </div>
  );
}

export default Login;
