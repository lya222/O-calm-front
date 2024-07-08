import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import MenuLog from '../MenuLog/MenuLog';

function NavBar() {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  return (
    <Box
      sx={
        {
          // position: "fixed",
          // bottom: "0",
          // height: "50px",
          // width: "100%",
          // zIndex: "tooltip",
        }
      }
    >
      <BottomNavigation>
        <Link to="/">
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        </Link>
        <Link to="/404">
          <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        </Link>
        {isLogged ? (
          <MenuLog />
        ) : (
          <Link to="/login">
            <AccountCircleIcon color="action" fontSize="large" />
          </Link>
        )}
      </BottomNavigation>
    </Box>
  );
}

export default NavBar;
