import {
  Box,
  Button,
  // IconButton,
  // InputAdornment,
  // OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
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
// import CreateIcon from '@mui/icons-material/Create';

function Profile() {
  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const user = async () => {
      await dispatch(takeUser(userState.id as number));
    };
    user();
  }, []);

  const deleteCount = async () => {
    console.log('je rentre dans mon boutton suprimer compte');
    const response = await dispatch(deleteUser(userState.id));
    if (deleteUser.fulfilled.match(response)) {
      alert('Votre compte a bien était suprimer');
      navigate('/');
    }
  };

  const { register, handleSubmit } = useForm<User>();
  const onSubmit: SubmitHandler<ICredentials> = (data) =>
    dispatch(login(data as ICredentials));

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
          //pour mettre l'icone du petit stylo
          // {...register('username', { required: true })}
          // endAdornment={
          //   <InputAdornment position="end">
          //     <IconButton edge="end" aria-label="button change username">
          //       <CreateIcon />
          //     </IconButton>
          //   </InputAdornment>
          // }
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2, backgroundColor: '#2e7d32' }}
          disabled={status === 'loading'}
        >
          Modifier
        </Button>
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
