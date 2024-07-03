import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import RegisterForm from '../../elements/RegisterForm/RegisterForm';
import { fetchUser } from '../../../store/reducers/userReducer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Login from '../../elements/Login/Login';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Logout from '../../elements/Logout/Logout';
import './style.scss';

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
    // // <Box sx={{ overflowY: 'auto', height: '200px', flexGrow: 1 }}>
    //   {/* <RegisterForm />
    //   <Logout /> */}
    //   {/* <Typography>{showLogin ? <Logout /> : <RegisterForm />}</Typography>
    //   <IconButton onClick={handleToggle} aria-label="toggle">
    //     {showLogin ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    //   </IconButton> */}
    <Container component="main" className="container">
      <Container component="div" className="content">
        <Box className={`page ${showLogin ? 'visible' : 'hidden'}`}>
          <Logout /> {/* Utiliser le composant Logout ici */}
        </Box>
        <Box className={`toggle-bar`} onClick={handleToggle}>
          <Button variant="contained" color="success">
            {showLogin ? 'Pas encore de compte' : 'Déjà un compte'}
          </Button>
          <Box className={`page ${showLogin ? 'hidden' : 'visible'}`}>
            <RegisterForm />
          </Box>
        </Box>
      </Container>
    </Container>
    // {/* </Box> */}
  );
}

export default Registration;
