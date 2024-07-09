import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import MenuLog from '../MenuLog/MenuLog';
import SearchBar from '../SearchBar/SearchBar';

function NavBar() {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const displaySearchBar = () => {
    return <SearchBar />;
  };
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
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            onClick={displaySearchBar}
          />
        </Link>
        <SearchBar />

        {isLogged ? (
          <MenuLog />
        ) : (
          <BottomNavigationAction
            component={Link}
            to="/login"
            label="Account"
            icon={<AccountCircleIcon sx={{ fontSize: '2rem' }} />}
            showLabel={true}
          />
        )}
      </BottomNavigation>
    </Box>
  );
}

export default NavBar;
