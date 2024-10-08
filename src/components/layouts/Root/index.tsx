import { useDispatch } from 'react-redux';
import NavBar from '../../elements/Navbar/NavBar';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import { loadPlaces } from '../../../store/reducers/placesReducer';
import { useAppSelector } from '../../../hooks/redux';
import { Outlet, useLocation } from 'react-router-dom';
import Loading from '../../elements/Loading/Loading';
import { Box, Container, useMediaQuery } from '@mui/material';
import { AppDispatch } from '../../../store';
import Cookies from 'js-cookie';
import { fetchFavorite, reconnect } from '../../../store/reducers/userReducer';
//Importation du footer 
import Footer from '../../pages/Footer/Footer';

function Root() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const idUser = useAppSelector((state) => state.user.id);
  const isLoading = useAppSelector((state) => state.places.loading);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  useEffect(() => {
    if (Cookies.get('token')?.length != 0) {
      const restoreCookies = async () => {
        const token = Cookies.get('token');
        await dispatch(reconnect(token as string));
      };
      restoreCookies();
    }
  }, [dispatch]);

  useEffect(() => {
    const init = async () => {
      await dispatch(loadPlaces());
      if (isLogged && !favoritesLoaded) { 
        // Charger les favoris uniquement si non chargés
        await dispatch(fetchFavorite(idUser));
        setFavoritesLoaded(true); // Marquer les favoris comme chargés
      }
    };
    init();
  }, [dispatch, location, isLogged, idUser, favoritesLoaded]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: 0,
          heigh: '100vh',
          width: '100vw',
        }}
      >
        <Header />
        <Container
          sx={{
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            mt: '5vh',
          }}
        >
          {isLoading ? <Loading /> : <Outlet />}
        </Container>
        {isMobile && <NavBar />}

      </Box>
      <Footer/>


    </>
  );
}

export default Root;
