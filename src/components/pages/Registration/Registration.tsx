import { Box, Typography } from '@mui/material';
import RegisterForm from '../../elements/RegisterForm/RegisterForm';

function Registration() {
  return (
    <Box sx={{ overflowY: 'auto', height: '200px', flexGrow: 1 }}>
      <RegisterForm />
    </Box>
  );
}

export default Registration;
