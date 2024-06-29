import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import CardPlace from "./components/elements/CardPlace/CardPlace.tsx";
import NavBar from "./components/elements/Navbar/NavBar.tsx";
import CardDetail from "./components/elements/CardDetail/CardDetail.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CardPlace />
    <CardDetail />
    <NavBar />
  </React.StrictMode>
);
