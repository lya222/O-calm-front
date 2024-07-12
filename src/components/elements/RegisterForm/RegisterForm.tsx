import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../store/reducers/userReducer';
import { Link, useNavigate } from 'react-router-dom';
// import { RootState, AppDispatch } from '../app/store';
import { TextField, Button, Box, Typography, Modal } from '@mui/material';
import { AppDispatch } from '../../../store';

const style = {
  position: 'relative',
  marginTop: '-50px', // Utilisation de marginTop
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function RegisterForm() {
  const [pseudoError, setPseudoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    //Verification pseudo
    if (name === 'username') {
      if (!/^.{2,}$/.test(formData.username))
        setPseudoError('Le pseudo doit contenir 2 caracteres au moins');
      else setPseudoError('');
    }
    //Verification password
    if (name === 'password') {
      if (!/^([a-zA-Z0-9._-]+){8,}$/.test(formData.password))
        setPasswordError('mot de passe invalide');
      else setPasswordError('');
    }
    //Verification email
    if (name === 'email') {
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z.-]+.[a-zA-Z]{2,4}$/.test(formData.email))
        setEmailError('Adresse invalide');
      else setEmailError('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //pseudo deja pris ou non
    // const users = await dispatch(fetchUser());

    // const result = users.payload.find(
    //   (user) => user.pseudo === formData.pseudo
    // );

    // if (result) setPseudoError('Ce pseudo est déjâ pris');
    if (emailError === '' || pseudoError === '' || passwordError === '') {
      try {
        const result = await dispatch(createUser(formData));
        console.log('le resultat de mon enregistrement', result);
        alert('Bravo vous etes enregistré. Connectez-vous');
        navigate('/');
      } catch (error) {
        console.log("Erreur sur l'envoie du formulaire");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 400,
        maxWidth: '100%',
        p: 2,
        bgcolor: 'white',
        color: 'black',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Enregistrez-vous
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="username"
        name="username"
        autoComplete="username"
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
      <TextField
        margin="normal"
        required
        fullWidth
        name="passwordConfirm"
        label="passwordConfirm"
        type="password"
        id="passwordConfirm"
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

      <Modal
        open={open}
        // onClose={!open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="black"
          >
            Bravo vous êtes inscrit
          </Typography>
          <Link
            id="modal-modal-description"
            to="/"
            onClick={() => {
              setOpen(false);
            }}
          >
            Retour a l'accueil
          </Link>
        </Box>
      </Modal>
    </Box>
  );
}

export default RegisterForm;
