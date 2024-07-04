import { Box, Button, Container } from '@mui/material';
import RegisterForm from '../../elements/RegisterForm/RegisterForm';
import { fetchUser } from '../../../store/reducers/userReducer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';
import Login from '../../elements/Login/Login';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../store';

function Registration() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(fetchUser());
        const users = unwrapResult(actionResult); // Extract the payload
        console.log('Liste des utilisateurs', users);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des utilisateurs:',
          error
        );
      }
    };

    fetchData();

    fetchData();
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
