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
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import customIconImage from '../../../../public/image/ONOFF2.png';
import desktopHeaderImageUrl from '../../../../public/image/flowers-7790227_1280.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../../assets/fonts/fonts.css';

const theme = createTheme({
  typography: {
    fontFamily: ['Bion', 'Anurati'].join(','),
  },
});

const Header = () => {
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
      width: '20px', // Ajustez la taille de l'image personnalisée selon vos besoins
      height: '20px',
    },
    textBox: {
      background: 'rgba(0, 0, 0, 0)', // Fond semi-transparent
      color: '#fff', // Couleur du texte blanche
      padding: theme.spacing(4), // Ajout de la marge intérieure
      position: 'absolute', // Positionnement absolu
      top: '64px', // Positionné juste en dessous de la toolbar (ajustez si nécessaire)
      width: '40%', // Largeur complète
      textAlign: 'left', // Texte centré
      zIndex: 3, // Assurez-vous que la zone de texte est au-dessus de l'image et de la toolbar
      fontFamily: 'anurati',
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
                <Typography variant="h6" className={classes.navLinks}>
                  Home
                </Typography>
                <Typography variant="h6" className={classes.navLinks}>
                  Profil
                </Typography>
                <Typography variant="h6" className={classes.navLinks}>
                  Créer un lieu
                </Typography>
                <Typography variant="h6" className={classes.navLinks}>
                  Carte
                </Typography>
                {/* <img
              src={customIconsImage}
              alt="Custom Icon"
              className={classes.customIcon}
            /> */}
                <CardMedia
                  sx={{ width: '20px' }}
                  component="img"
                  image={customIconImage}
                  className={classes.customIcon}
                />
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
          </Box>
        )}
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Header;
