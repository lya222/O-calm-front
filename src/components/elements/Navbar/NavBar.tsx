import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

function NavBar() {
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
      <BottomNavigation showLabels>
        <Link to="/">
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        </Link>
        <Link to="/404">
          <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        </Link>

        <Link to="/login">
          <BottomNavigationAction
            label="ManageAccount"
            icon={<ManageAccountsIcon />}
          />
        </Link>
      </BottomNavigation>
    </Box>
  );
}

export default NavBar;
