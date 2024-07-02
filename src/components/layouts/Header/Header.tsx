import SearchBar from "../../elements/SearchBar/SearchBar";
import { Box } from "@mui/material";
// import image from '../../../image/flowers-7790227_1280.jpg'

function Header() {
  return (
    <Box
      sx={{
        // position: "fixed",
        height: "100px",
        // m: "auto",
        // width: "100%",
        backgroundImage: "url(../../../image/flowers-7790227_1280.jpg)",
        // top: "0",

        // zIndex: "tooltip",
      }}
    >
      <h1>O'CALM</h1>
      <SearchBar />
    </Box>
  );
}

export default Header;
