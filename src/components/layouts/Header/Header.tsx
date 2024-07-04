import { Box } from '@mui/material';
// import image from '../../../image/flowers-7790227_1280.jpg'

function Header() {
  return (
    <Box
      sx={{
        minHeight: '75px',
        backgroundImage: 'url(../../../image/flowers-7790227_1280.jpg)',
      }}
    >
      <p>O'CALM</p>
    </Box>
  );
}

export default Header;
