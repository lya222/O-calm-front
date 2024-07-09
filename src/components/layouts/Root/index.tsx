import { useDispatch } from 'react-redux';
import NavBar from '../../elements/Navbar/NavBar';
import Header from '../Header/Header';
import { useEffect } from 'react';
import { loadPlaces } from '../../../store/reducers/placesReducer';
import { useAppSelector } from '../../../hooks/redux';
import { Outlet } from 'react-router-dom';
import Loading from '../../elements/Loading/Loading';
import { Box, Container } from '@mui/material';
import { AppDispatch } from '../../../store';

function Root() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  // const places = useAppSelector((state) => state.places.list);
  const isLoading = useAppSelector((state) => state.places.loading);
  // const isLogged = useAppSelector((state) => state.user.isLogged);
  const pseudo = useAppSelector((state) => state.user.pseudo);

  // console.log('places', places);
  // console.log('isLoading', isLoading);
  // console.log('isLogged', isLogged);
  console.log('Le pseudo', pseudo);

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

        <Container sx={{ overflowY: 'auto' }}>
          {isLoading ? <Loading /> : <Outlet />}
        </Container>
        <NavBar />
      </Box>
    </>
  );
}

export default Root;
