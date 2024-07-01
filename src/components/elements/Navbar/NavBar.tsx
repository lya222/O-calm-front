import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SearchIcon from "@mui/icons-material/Search";

function NavBar() {
  return (
    <Container
      sx={{
        m: "auto",
        position: "fixed",
        bottom: "0",
        width: "100%",
        zIndex: "tooltip",
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />

        <BottomNavigationAction
          label="ManageAccount"
          icon={<ManageAccountsIcon />}
        />
      </BottomNavigation>
    </Container>
  );
}

export default NavBar;
