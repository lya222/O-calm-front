import { useDispatch } from "react-redux";
import NavBar from "../../elements/Navbar/NavBar";
import Header from "../Header/Header";
import { useEffect } from "react";
import { loadPlaces } from "../../../store/reducers/placesReducer";
import { useAppSelector } from "../../../hooks/redux";
import { Outlet } from "react-router-dom";
import Loading from "../../elements/Loading/Loading";

function Root() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  const places = useAppSelector((state) => state.places.list);
  const isLoading = useAppSelector((state) => state.places.loading);

  console.log("places", places);
  console.log("isLoading", isLoading);

  return (
    <>
      <Header />
      {isLoading ? <Loading /> : <Outlet />}
      <NavBar />
    </>
  );
}

export default Root;
