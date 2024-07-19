import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateUser } from '../../../@types/user';
import { useNavigate } from 'react-router-dom';
import '../../../assets/fonts/fonts.css';
import { useEffect, useState } from 'react';
import { createUser } from '../../../store/selectors/users';
import { makeStyles } from '@mui/styles';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Bion, Arial, sans-serif',
  },
});

interface IErrorPassaword {
  minLength: { message: string; validate: boolean };
  hasUpperCase: { message: string; validate: boolean };
  hasLowerCase: { message: string; validate: boolean };
  hasNumber: { message: string; validate: boolean };
  hasSpecialChar: { message: string; validate: boolean };
}

function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CreateUser>({ shouldFocusError: true });
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'loading' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const password = watch('password');
  const confirmPassword = watch('passwordConfirm');
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [errorPassword, setErrorPassword] = useState<IErrorPassaword>({
    minLength: {
      message: 'Le mot de passe doit contenir au moins 8 caractères',
      validate: false,
    },
    hasUpperCase: {
      message: 'Le mot de passe doit contenir au moins 8 caractères',
      validate: false,
    },
    hasLowerCase: {
      message: 'Le mot de passe doit contenir au moins une lettre minuscule',
      validate: false,
    },
    hasNumber: {
      message: 'Le mot de passe doit contenir au moins un nombre',
      validate: false,
    },
    hasSpecialChar: {
      message: 'Le mot de passe doit contenir au moins un caractère spécial',
      validate: false,
    },
  });
  const [validateAllContraints, setValidateAllContraints] = useState(false);

  useEffect(() => {
    trigger('password');
  }, [trigger, password]);

  useEffect(() => {
    const allValid = Object.values(errorPassword).every(
      (contraint) => contraint.validate
    );
    setValidateAllContraints(allValid);
  }, [errorPassword]);

  const validatePassword = (value: string) => {
    setErrorPassword((prevState) => ({
      ...prevState,
      minLength: {
        ...prevState.minLength,
        validate: value.length >= 8,
      },
      hasUpperCase: {
        ...prevState.hasUpperCase,
        validate: /[A-Z]/.test(value),
      },
      hasLowerCase: {
        ...prevState.hasLowerCase,
        validate: /[a-z]/.test(value),
      },
      hasNumber: {
        ...prevState.hasNumber,
        validate: /[0-9]/.test(value),
      },
      hasSpecialChar: {
        ...prevState.hasSpecialChar,
        validate: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      },
    }));
  };

  const handleValidatePassword = (value: string) => {
    validatePassword(value);
    console.log('mes erruer sur le password', errorPassword);
  };

  const onSubmit: SubmitHandler<CreateUser> = async (data) => {
    setStatus('loading');
    setErrorMessage(null);
    console.log(data);
    try {
      const response = await createUser(data as CreateUser);
      console.log('Verification de ma réponse pour le createuser', response);
      if (response.newUser) {
        console.log('le login marche', response);
        // navigate('/');
        setOpen(true);
      } else {
        setErrorMessage('Il y a eu une erreur lors de votre enregistrement');
        console.log("l'enregistrement ne marche pas", response.message);
        setStatus('failed');
      }
    } catch (err) {
      setStatus('failed');
    }
  };
  console.log('essai', password, confirmPassword);
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
        Enregistrez-Vous
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3, fontFamily: 'Bion' }}
      >
        <TextField
          fullWidth
          label="pseudo"
          type="text"
          placeholder="pseudo"
          {...register('username', { required: true, min: 2 })}
          sx={{ fontFamily: 'Bion, Arial, sans-serif' }}
          className={classes.root}
          InputProps={{
            autoComplete: 'username',
          }}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ''}
          spellCheck="false"
        />
        <TextField
          fullWidth
          label="E-mail"
          type="email"
          placeholder="E-mail"
          {...register('email', {
            required: 'E-mail non valide',
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+.[a-zA-Z]{2,4}$/i,
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
          className={classes.root}
          InputProps={{
            autoComplete: 'email',
          }}
          spellCheck="false"
        />
        <TextField
          fullWidth
          label="Mot de passe"
          type="password"
          placeholder="Mot de passe"
          {...register('password', {
            required: 'Le mot de passe est requis',
          })}
          onChange={(e) => handleValidatePassword(e.target.value)}
          error={!validateAllContraints}
          className={classes.root}
          InputProps={{
            autoComplete: 'password',
          }}
        />
        {Object.entries(errorPassword).map(([key, value]) => (
          <Box
            key={key}
            sx={{
              mb: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              gutterBottom
              sx={{
                fontFamily: 'Bion, Arial, sans-serif',
                fontSize: 10,
                color: value.validate ? 'green' : 'red',
                m: 0,
              }}
            >
              {value.message}
            </Typography>
            {value.validate ? (
              <DoneIcon color="success" />
            ) : (
              <CloseIcon color="error" />
            )}
          </Box>
        ))}

        <TextField
          fullWidth
          label="Confirmation de mot de passe"
          type="password"
          placeholder="Confirmation mot de passe"
          {...register('passwordConfirm', {
            required: true,
            validate: (value) =>
              value === password ||
              'Les deux mots de passe ne correspondent pas',
          })}
          error={!!errors.passwordConfirm}
          helperText={
            errors.passwordConfirm ? errors.passwordConfirm.message : ''
          }
          className={classes.root}
          InputProps={{
            autoComplete: 'passwordConfirm',
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2, fontFamily: 'Bion, Arial, sans-serif' }}
          disabled={status === 'loading'}
        >
          Enregistrer
        </Button>
        {status === 'loading' && <Typography>Loading...</Typography>}
        {status === 'failed' && (
          <Typography color="error">{errorMessage}</Typography>
        )}
      </Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          position: 'absolute',
          marginT: '-50px',
          left: 0,
          m: 'auto',
          height: '20%',
          width: '50%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="black"
          >
            Bravo vous êtes inscrit
          </Typography>
          <Button
            variant="contained"
            color="primary"
            id="modal-modal-description"
            // to="/"
            onClick={() => {
              setOpen(false);
              navigate('/');
            }}
          >
            Retour a l'accueil
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default RegisterForm;
