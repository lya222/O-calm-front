import { Box, Button, Container } from '@mui/material';
import RegisterForm from '../../elements/RegisterForm/RegisterForm';
import { fetchUser } from '../../../store/reducers/userReducer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';
import Login from '../../elements/Login/Login';

function Registration() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <Container component="main" className="container">
      <Container component="div" className="content">
        <Box className={`page ${showLogin ? 'visible' : 'hidden'}`}>
          <Login /> {/* Utiliser le composant Logout ici */}
        </Box>
        <Box className={`toggle-bar`} onClick={handleToggle}>
          <Button variant="contained" color="success">
            {showLogin ? 'Pas encore de compte' : 'Déjà un compte'}
          </Button>
        </Box>
        <Box className={`page ${showLogin ? 'hidden' : 'visible'}`}>
          <RegisterForm />
        </Box>
      </Container>
    </Container>
  );
}

export default Registration;
