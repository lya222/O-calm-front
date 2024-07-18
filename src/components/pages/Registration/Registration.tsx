import { Box, Button, Container } from '@mui/material';
import RegisterForm from '../../elements/RegisterForm/RegisterForm';
import './style.scss';
import Login from '../../elements/Login/Login';
import '../../../assets/fonts/fonts.css';
import { useState } from 'react';

function Registration() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <Container component="main" className="container">
      <Container component="div" className="content">
        <Box className={`page ${showLogin ? 'visible' : 'hidden'}`}>
          <Login /> 
        </Box>
        <Box className={`toggle-bar`} onClick={handleToggle}>
          <Button
            variant="contained"
            color="success"
            sx={{
              ml: '2vh',
              fontFamily: 'Bion',
              bgcolor: '#567d4e', 
              '&:hover': {
                bgcolor: '#8aa167', 
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
