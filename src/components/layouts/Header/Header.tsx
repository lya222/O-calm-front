import { useAppSelector } from '../../../hooks/redux';
import MenuLog from '../../elements/MenuLog/MenuLog';
import { Box } from '@mui/material';
// import image from '../../../image/flowers-7790227_1280.jpg'

function Header() {
  const pseudo: string = useAppSelector((store) => store.user.pseudo);

  return (
    <Box
      sx={{
        // position: "fixed",
        height: '100px',
        display: 'flex',
        justifyContent: 'space-between',
        // m: "auto",
        // width: "100%",
        backgroundImage: 'url(../../../image/flowers-7790227_1280.jpg)',
      }}
    >
      <p>O'CALM</p>
    </Box>
  );
}

export default Header;
