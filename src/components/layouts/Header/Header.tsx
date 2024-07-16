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
import customIconImage from '../../../../public/image/ONOFF.png';
import desktopHeaderImageUrl from '../../../../public/image/flowers-7790227_1280.jpg';

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
      background: 'rgba(0, 0, 0, 0.5)',
    },
    navLinks: {
      marginRight: 8,
      color: '#fff',
    },
    iconButton: {
      color: '#fff',
    },
    customIcon: {
      width: '20px', // Ajustez la taille de l'image personnalisée selon vos besoins
      height: '20px',
    },
  }));
  const classes = useStyles();

  // const desktopHeaderImageUrl =
  //   '../../../images/public/image/flowers-7790227_1280.jpg';
  const mobileHeaderImageUrl = '../../../image/headermobile.png';

  return (
    <React.Fragment>
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
        <AppBar
          position="static"
          className={classes.headerImage}
          style={{ backgroundImage: `url(${desktopHeaderImageUrl})` }}
        >
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.navLinks}>
              Lien 1
            </Typography>
            <Typography variant="h6" className={classes.navLinks}>
              Lien 2
            </Typography>
            <Typography variant="h6" className={classes.navLinks}>
              Lien 3
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
      )}
    </React.Fragment>
  );
};

export default Header;
