import NavBar from "../NavBar/NavBar";
import SearchBar from "../../elements/SearchBar/SearchBar";

function Header() {
  return (
    <div className="divHeader" style={{ height: "600px", width: "1000px" }}>
      <header className="header">
        <h1>O'CALM</h1>
        {/* <NavBar></NavBar> */}
        <SearchBar />
      </header>
    </div>
  );
}

export default Header;
