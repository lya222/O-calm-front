import { Box, Button, Container } from '@mui/material';
import RegisterForm from '../../elements/RegisterForm/RegisterForm';
// import { fetchUser } from '../../../store/reducers/userReducer';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import './style.scss';
import Login from '../../elements/Login/Login';
// import { unwrapResult } from '@reduxjs/toolkit';
// import { AppDispatch } from '../../../store';
import '../../../assets/fonts/fonts.css';
import { useState } from 'react';

function Registration() {
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const actionResult = await dispatch(fetchUser());
  //       const users = unwrapResult(actionResult); // Extract the payload
  //     } catch (error) {
  //       console.error(
  //         'Erreur lors de la récupération des utilisateurs:',
  //         error
  //       );
  //     }
  //   };

  //   fetchData();

  //   fetchData();
  // }, [dispatch]);

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
          <Button
            variant="contained"
            color="success"
            sx={{
              fontFamily: 'Bion',
              bgcolor: '#567d4e', // Exemple de couleur verte
              '&:hover': {
                bgcolor: '#8aa167', // Exemple de couleur verte plus foncée au survol
              },
            }}
          >
            {showLogin ? 'Créer mon compte' : 'Déjà un compte'}
          </Button>
        </Box>
        <Box className={`page ${showLogin ? 'hidden' : 'visible'}`}>
          <RegisterForm />
        </Box>
        <Box sx={{ height: '80px' }} />
      </Container>
    </Container>
  );
}

export default Registration;
