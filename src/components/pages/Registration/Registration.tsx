import { Box } from '@mui/material';
import RegisterForm from '../../elements/RegisterForm/RegisterForm';
import { fetchUser } from '../../../store/reducers/userReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Registration() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Box sx={{ overflowY: 'auto', height: '200px', flexGrow: 1 }}>
      <RegisterForm />
    </Box>
  );
}

export default Registration;
