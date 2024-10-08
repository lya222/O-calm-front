import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ICredentials } from '../../../@types/Icredentials';
import { useDispatch } from 'react-redux';
import {
  deleteUser,
  login,
  takeUser,
} from '../../../store/reducers/userReducer';
import { useAppSelector } from '../../../hooks/redux';
import { AppDispatch } from '../../../store';
import { User } from '../../../@types/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const user = async () => {
      await dispatch(takeUser(userState.id as number));
    };
    user();
  }, []);

  const deleteCount = async () => {
    const response = await dispatch(deleteUser(userState.id));
    if (deleteUser.fulfilled.match(response)) {
      alert('Votre compte a bien était suprimer');
      navigate('/');
    }
  };

  const { register, handleSubmit } = useForm<User>();
  const onSubmit: SubmitHandler<ICredentials> = (data) =>
    dispatch(login(data as ICredentials));

  if (!isLogged) {
    navigate('/login');
    return null;
  }
  return (
    <Box
      sx={{
        width: 400,
        maxWidth: '100%',
        p: 2,
        mb: 10,
        bgcolor: 'white',
        color: 'black',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h5" component="h5" fontFamily="bion" gutterBottom>
        Mon profil
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label={userState.pseudo}
          type="pseudo"
          sx={{ mt: 3 }}
        />
        <TextField
          fullWidth
          label={userState.credentials.email}
          type="email"
          {...register('email', { required: true })}
          sx={{ mt: 3 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register('password', { required: true })}
          sx={{ mt: 3 }}
        />
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="error"
        sx={{ mt: 3, mb: 2, backgroundColor: '#d38b8b' }}
        disabled={status === 'loading'}
        onClick={deleteCount}
      >
        Supprimer le compte
      </Button>
    </Box>
  );
}

export default Profile;
