import { Box, IconButton, Typography } from '@mui/material';
import RegisterForm from '../../elements/RegisterForm/RegisterForm';
import { fetchUser } from '../../../store/reducers/userReducer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Login from '../../elements/Login/Login';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Logout from '../../elements/Logout/Logout';

function Registration() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [showLogin, setShowLogin] = useState(false);
  const handleToggle = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <Box sx={{ overflowY: 'auto', height: '200px', flexGrow: 1 }}>
      {/* <RegisterForm />
      <Logout /> */}
      <Typography>{showLogin ? <Logout /> : <RegisterForm />}</Typography>
      <IconButton onClick={handleToggle} aria-label="toggle">
        {showLogin ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </IconButton>
    </Box>
  );
}

export default Registration;
