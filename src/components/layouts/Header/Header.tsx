import { Box } from '@mui/material';
// import image from '../../../image/flowers-7790227_1280.jpg'

function Header() {
  return (
    <Box
      sx={{
        minHeight: '100px',
        backgroundImage: 'url(../../../image/headermobile.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'static',
      }}
    ></Box>
  );
}

export default Header;
