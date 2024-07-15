import { useDispatch } from 'react-redux';
import NavBar from '../../elements/Navbar/NavBar';
import Header from '../Header/Header';
import { useEffect } from 'react';
import { loadPlaces } from '../../../store/reducers/placesReducer';
import { useAppSelector } from '../../../hooks/redux';
import { Outlet, useLocation } from 'react-router-dom';
import Loading from '../../elements/Loading/Loading';
import { Box, Container } from '@mui/material';
import { AppDispatch } from '../../../store';
import Cookies from 'js-cookie';
import { fetchFavorite, reconnect } from '../../../store/reducers/userReducer';

function Root() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const idUser = useAppSelector((state) => state.user.id);
  const favorite = useAppSelector((state) => state.user.favorite);

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
      if (isLogged) await dispatch(fetchFavorite(idUser));
    };
    init();
  }, [dispatch, location, isLogged]);

  const isLoading = useAppSelector((state) => state.places.loading);
  console.log('mes favoris', favorite);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: 0,
          height: '100vh',
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
          }}
        >
          {isLoading ? <Loading /> : <Outlet />}
        </Container>
        <NavBar />
      </Box>
    </>
  );
}

export default Root;
