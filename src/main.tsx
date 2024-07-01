import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import CardPlace from "./components/elements/CardPlace/CardPlace.tsx";
import NavBar from "./components/elements/Navbar/NavBar.tsx";
import CardDetail from "./components/elements/CardDetail/CardDetail.tsx";
import Logout from "./components/elements/Logout/Logout.tsx";
import Registration from "./components/elements/Registration/Registration.tsx";
import Homes from "./components/pages/Homes/Homes.tsx";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/layouts/Header/Header.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <CardPlace />
    <CardDetail />
    <Logout />
    <Registration />
    <NavBar /> */}
      <Header />

      <NavBar />
    </Provider>
  </React.StrictMode>
);
