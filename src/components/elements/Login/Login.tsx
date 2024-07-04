import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../../../@types/user';
import { SignInActionPayload } from '../../../@types/authkit';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'loading' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<User> = async (data) => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      const response = await axios.post('http://localhost:3001/login', {
        //changement de la propriété email en pseudo 04.07
        pseudo: data.pseudo, // Assuming 'pseudo' is used as email
        password: data.password,
      });

      if (
        signIn({
          token: response.data.token,
          expiresIn: response.data.expiresIn,
          tokenType: 'Bearer',
          auth: {
            token: response.data.token,
            type: 'Bearer',
          },
          authState: { email: response.data.email },
        } as SignInActionPayload<string>)
      ) {
        setStatus('idle');
        alert('connexion réussite');

        // Remet l'état à idle après une connexion réussie
        navigate('/');
      } else {
        setStatus('failed');
        setErrorMessage('Authentication failed. Please try again.');
      }
    } catch (error) {
      setStatus('failed');
      setErrorMessage(
        'Login error: ' + (error.response?.data?.message || error.message)
      );
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
