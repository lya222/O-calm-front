import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { RootState, AppDispatch } from '../app/store';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ userData: formData }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        disabled={status === 'loading'}
      >
        Register
      </Button>
      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && (
        <Typography color="error">Error: {error}</Typography>
      )}
    </Box>
  );
};

export default RegisterForm;

// import { Box, FormControl, TextField } from "@mui/material";

// function Registration() {
//   return (
//     <Box
//       sx={{
//         width: 400,
//         maxWidth: "100%",
//         p: 2,
//         bgcolor: "white",
//       }}
//     >
//       <FormControl fullWidth>
//         <TextField fullWidth label="Nom" id="firstname" />
//         <TextField fullWidth label="Prénom" id="lastname" />
//         <TextField fullWidth label="Email" id="email" />
//         <TextField fullWidth label="Mot de passe" id="password" />
//       </FormControl>
//     </Box>
//   );
// }

// export default Registration;
