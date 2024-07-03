import { useAppSelector } from '../../../hooks/redux';
import SearchBar from '../../elements/SearchBar/SearchBar';
import { Box } from '@mui/material';
// import image from '../../../image/flowers-7790227_1280.jpg'

function Header() {
  const isLog = useAppSelector((store) => store.user.isLogged);
  return (
    <Box
      sx={{
        // position: "fixed",
        height: '100px',
        // m: "auto",
        // width: "100%",
        backgroundImage: 'url(../../../image/flowers-7790227_1280.jpg)',
      }}
    >
      <h1>O'CALM {isLog ? 'connecter' : 'deconnecter'}</h1>
      <SearchBar />
    </Box>
  );
}

export default Header;
