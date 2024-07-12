import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import MenuLog from '../MenuLog/MenuLog';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { searchPlace } from '../../../store/reducers/placesReducer';

function NavBar() {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displaySearchBar = () => {
    dispatch(searchPlace(''));
    navigate('/');
    // return <SearchBar />;
  };
  return (
    <Box
      sx={{
        position: 'fixed',

        bottom: 0,
        width: '100%',
        zIndex: 1000,
      }}
    >
      <BottomNavigation sx={{ display: 'flex', justifyContent: 'center' }}>
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
