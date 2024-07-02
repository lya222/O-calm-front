import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../store/reducers/userReducer';
// import { RootState, AppDispatch } from '../app/store';
import { User } from '../../../@types/user';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { AppDispatch, RootState } from '../../../store';
import { useAppSelector } from '../../../hooks/redux';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const testMail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;

  const [formData, setFormData] = useState({
    pseudo: '',
    password: '',
    email: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  // const { status, error } = useSelector((state: RootState) => state.data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log('formdata', formData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
    await dispatch(createUser(formData));
  };

  const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value))
      setEmailError('Adresse invalide');
    else setEmailError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Enregistrez-vous
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="pseudo"
        label="pseudo"
        name="pseudo"
        autoComplete="pseudo"
        autoFocus
        // value={formData.pseudo}
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
        // value={formData.email}
        onChange={(handleChange, emailChange)}
        error={emailError}
        helperText={emailError}
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
        // value={formData.password}
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
        Enregister
      </Button>
      {/* {status === 'loading' && <CircularProgress />} */}
      {/* {status === 'failed' && (
        <Typography color="error">Error: {error}</Typography>
      )} */}
    </Box>
  );
}

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
