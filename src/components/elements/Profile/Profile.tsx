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
  const isLogged = useAppSelector((state)=> state.user.isLogged);

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


  //Gestion de la route 
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
      }}
    >
      <Typography variant="h5" component="h5" gutterBottom>
        Mon profil
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label={userState.pseudo}
          type="pseudo"
          //pour mettre licone du petit stylo
          // {...register('username', { required: true })}
          // endAdornment={
          //   <InputAdornment position="end">
          //     <IconButton edge="end" aria-label="button change username">
          //       <CreateIcon />
          //     </IconButton>
          //   </InputAdornment>
          // }
        />
        <TextField
          fullWidth
          label={userState.credentials.email}
          type="email"
          {...register('email', { required: true })}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register('password', { required: true })}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
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
        sx={{ mt: 3, mb: 2 }}
        disabled={status === 'loading'}
        onClick={deleteCount}
      >
        Supprimer le compte
      </Button>
    </Box>
  );
}

export default Profile;
