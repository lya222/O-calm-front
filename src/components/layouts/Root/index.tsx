import { useDispatch } from 'react-redux';
import NavBar from '../../elements/Navbar/NavBar';
import Header from '../Header/Header';
import { useEffect } from 'react';
import { loadPlaces } from '../../../store/reducers/placesReducer';
import { useAppSelector } from '../../../hooks/redux';
import { Outlet } from 'react-router-dom';
import Loading from '../../elements/Loading/Loading';
import { Box, Container } from '@mui/material';

function Root() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  const places = useAppSelector((state) => state.places.list);
  const isLoading = useAppSelector((state) => state.places.loading);

  console.log('places', places);
  console.log('isLoading', isLoading);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          height: '100vh',
          width: '100vw',
        }}
      >
        <Header />
        <Container>{isLoading ? <Loading /> : <Outlet />}</Container>
        <NavBar />
      </Box>
    </>
  );
}

export default Root;
