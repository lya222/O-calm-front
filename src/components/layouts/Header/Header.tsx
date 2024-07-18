// import { Box } from '@mui/material';
// // import image from '../../../image/flowers-7790227_1280.jpg'

// function Header() {
//   return (
//     <Box
//       sx={{
//         minHeight: '100px',
//         backgroundImage: 'url(../../../image/headermobile.png)',
//         backgroundSize: 'contain',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         position: 'static',
//       }}
//     ></Box>
//   );
// }

// export default Header;

import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  CssBaseline,
  Box,
  CardMedia,
  Button,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
// import {Link} from 'react-router-dom';
import { Link } from 'react-router-dom';

import customIconImage from '../../../../public/image/ONOFF2.png';
// import desktopHeaderImageUrl from '../../../../public/image/flowers-7790227_1280.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../../assets/fonts/fonts.css';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { logout } from '../../../store/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import SearchBardesktop from '../../elements/SearchBar/Searchbardesktop';

const theme = createTheme({
  typography: {
    fontFamily: ['Bion', 'Anurati'].join(','),
  },
});

const Header = () => {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  console.log('test');
  const isMobile = useMediaQuery('(max-width:600px)');
  const useStyles = makeStyles(() => ({
    headerImage: {
      backgroundImage:
        'url(../../../image/public/image/flowers-7790227_1280.jpg)',
      height: '50vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    },
    toolbar: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '40px',
      background: 'rgba(0, 0, 0, 0.1)',
    },
    navLinks: {
      marginRight: theme.spacing(4),
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Bion',
    },
    iconButton: {
      color: '#fff',
    },
    customIcon: {
      width: '20px',
      height: '20px',
    },
    textBox: {
      background: 'rgba(0, 0, 0, 0)',
      color: '#fff',
      padding: theme.spacing(4),
      position: 'absolute',
      top: '64px',
      width: '40%',
      textAlign: 'left',
      zIndex: 3,
      fontFamily: 'anurati',
    },
    searchDesktop: {
      position: 'absolute',
      top: 280,
      left: 0,
      zIndex: 10,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  }));
  const classes = useStyles();

  const desktopHeaderImageUrl = '../../../image/flowers-7790227_1280.jpg';
  const mobileHeaderImageUrl = '../../../image/headermobile.png';

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Header mobile */}
        {isMobile && (
          <Box
            sx={{
              minHeight: '100px',
              backgroundImage: `url(${mobileHeaderImageUrl})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'static',
            }}
          />
        )}

        {/* Header desktop */}
        {!isMobile && (
          <Box>
            <AppBar
              position="static"
              className={classes.headerImage}
              style={{ backgroundImage: `url(${desktopHeaderImageUrl})` }}
            >
              <Toolbar className={classes.toolbar}>
                <Button
                  component={Link}
                  to="/"
                  style={{ textTransform: 'none' }}
                >
                  <Typography variant="h6" className={classes.navLinks}>
                    Home
                  </Typography>
                </Button>
                {isLogged && (
                  <>
                    <Button
                      component={Link}
                      to="/profile"
                      style={{ textTransform: 'none' }}
                    >
                      <Typography variant="h6" className={classes.navLinks}>
                        Profil
                      </Typography>
                    </Button>

                    <Button
                      component={Link}
                      to="/createplace"
                      style={{ textTransform: 'none' }}
                    >
                      <Typography variant="h6" className={classes.navLinks}>
                        Créer un lieu
                      </Typography>
                    </Button>
                  </>
                )}
                <Button
                  component={Link}
                  to="/maps"
                  style={{ textTransform: 'none' }}
                >
                  <Typography variant="h6" className={classes.navLinks}>
                    Carte
                  </Typography>
                </Button>

                <IconButton
                  onClick={isLogged ? handleLogout : () => navigate('/login')}
                >
                  <CardMedia
                    sx={{ width: '20px' }}
                    component="img"
                    image={customIconImage}
                    className={classes.customIcon}
                  />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Box className={classes.textBox}>
              <Typography
                variant="body1"
                style={{ fontFamily: 'Anurati', fontSize: '3rem' }}
              >
                O CALM
              </Typography>
            </Box>
            <Box className={classes.searchDesktop}>
              <SearchBardesktop />
            </Box>
          </Box>
        )}
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Header;
