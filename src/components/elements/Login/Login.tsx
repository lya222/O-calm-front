import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../@types/user';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/reducers/userReducer';
import { ICredentials } from '../../../@types/Icredentials';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState<'idle' | 'loading' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<User> = async (data) => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      await dispatch(login(data as ICredentials));
      navigate('/');
    } catch (error) {
      setStatus('failed');
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        maxWidth: '100%',
        p: 2,
        bgcolor: 'white',
        color: 'black',
      }}
    >
      <Typography variant="h5" component="h5" gutterBottom>
        Connectez-vous
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="pseudo"
          type="text"
          {...register('pseudo', { required: 'Pseudo is required' })}
          error={!!errors.pseudo}
          helperText={errors.pseudo ? errors.pseudo.message : ''}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={status === 'loading'}
        >
          Enregistrer
        </Button>
        {status === 'loading' && <Typography>Loading...</Typography>}
        {status === 'failed' && (
          <Typography color="error">{errorMessage}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;
