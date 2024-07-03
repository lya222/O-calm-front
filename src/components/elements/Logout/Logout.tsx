import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../../../@types/user';

function Logout() {
  // const { register, handleSubmit, control } = useForm<User>();
  // const onSubmit: SubmitHandler<User> = (data) => {
  //   console.log(data);
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = (data) => console.log(data, errors);

  return (
    <Box
      sx={{
        width: 400,
        maxWidth: '100%',
        p: 2,
        bgcolor: 'white',
      }}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="pseudo"
          type="pseudo"
          {...register('pseudo', { required: true })}
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
          Enregister
        </Button>
      </Box>
    </Box>
  );
}

export default Logout;
