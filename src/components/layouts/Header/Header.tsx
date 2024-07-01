import NavBar from "../NavBar/NavBar";
import SearchBar from "../../elements/SearchBar/SearchBar";
import { Box, CardMedia, Paper } from "@mui/material";
// import image from '../../../image/flowers-7790227_1280.jpg'

function Header() {
  return (
    // <div className="divHeader" style={{ height: "600px", width: "1000px" }}>
    //   <header className="header">
    <Paper
      sx={{
        height: "100px",
        m: "auto",
        width: "100%",
        backgroundImage: "url(../../../image/flowers-7790227_1280.jpg)",
        position: "fixed",
        top: "0",
        zIndex: "tooltip",
      }}
    >
      <h1>O'CALM</h1>
      <SearchBar />
    </Paper>

    //   </header>
    // </div>
  );
}

export default Header;
