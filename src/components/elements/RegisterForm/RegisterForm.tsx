import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUser,
  fetchUser,
  findUser,
} from '../../../store/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
// import { RootState, AppDispatch } from '../app/store';
import { User } from '../../../@types/user';
import { TextField, Button, Box, Typography } from '@mui/material';
import { AppDispatch, RootState } from '../../../store';
import { redirect } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';

function RegisterForm() {
  const [pseudoError, setPseudoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const users = useAppSelector((state) => state.user.data);
  console.log('formdata', users);
  const [formData, setFormData] = useState({
    pseudo: '',
    password: '',
    email: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const { status, error } = useSelector((state: RootState) => state.data);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    //Verification pseudo
    if (name === 'pseudo') {
      if (!/^.{2,}$/.test(formData.pseudo))
        setPseudoError('Le pseudo doit contenir 2 caracteres au moins');
      else setPseudoError('');
    }
    //Verification password
    if (name === 'password') {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
          formData.password
        )
      )
        setPasswordError('mot de passe invalide');
      else setPasswordError('');
    }
    //Verification email
    if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        setEmailError('Adresse invalide');
      else setEmailError('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //pseudo deja pris ou non
    const result = users.find((user) => user.pseudo === formData.pseudo);
    console.log('finduser ', result);
    if (result) setPseudoError('Ce pseudo est déjâ pris');
    if (emailError === '' || pseudoError === '' || passwordError === '') {
      console.log('vrai');
      await dispatch(createUser(formData));
      navigate('/');
    }
  };

  // const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  //   if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value))
  //     setEmailError('Adresse invalide');
  //   else setEmailError('');
  // };

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
        error={pseudoError !== ''}
        helperText={pseudoError}
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
        onChange={handleChange}
        error={emailError !== ''}
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
