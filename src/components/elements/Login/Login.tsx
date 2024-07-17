import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/reducers/userReducer';
import { ICredentials } from '../../../@types/Icredentials';
import { AppDispatch } from '../../../store';
import '../../../assets/fonts/fonts.css';
// import useAuthUser from '../../../hooks/useAuth';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Bion, Arial, sans-serif',
  },
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICredentials>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const classes = useStyles();

  const onSubmit: SubmitHandler<ICredentials> = async (data) => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      const response = await dispatch(login(data as ICredentials));
      console.log('verification de ma reponse', response);
      if (login.fulfilled.match(response)) {
        console.log('le login marche', response.payload.id);

        navigate('/');
      } else {
        setErrorMessage("L'email ou le mot de passe ne correspondent pas");
        console.log('le login ne marche pas');
        setStatus('failed');
      }
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
        fontFamily: 'Bion',
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
        sx={{ fontFamily: 'Bion, Arial, sans-serif' }}
      >
        Connectez-vous
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3, fontFamily: 'Bion' }}
      >
        <TextField
          fullWidth
          label="email"
          type="text"
          {...register('email', {
            required: 'email valide est requis',
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+.[a-zA-Z]{2,4}$/i,
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
          sx={{ fontFamily: 'Bion, Arial, sans-serif' }}
          className={classes.root}
          InputProps={{
            autoComplete: 'email',
          }}
          spellCheck="false"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
          className={classes.root}
          InputProps={{
            autoComplete: 'current-password',
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2, fontFamily: 'Bion, Arial, sans-serif' }}
          disabled={status === 'loading'}
          aria-label="Connexion"
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
