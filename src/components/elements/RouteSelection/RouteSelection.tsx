import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IGenerateRoute } from '../../../@types/Map';
import { generateRoute } from '../../../store/reducers/placesReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import { useEffect } from 'react';
// import { fetchCityFrance } from '../../../store/selectors/map';

function RouteSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<IGenerateRoute>();
  const [positionLoc, setPositionLoc] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    //Search your localisation
    if ('geolocation' in navigator) {
      console.log('Geolocation is available');
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('Latitude: ' + position.coords.latitude);
        console.log('Longitude: ' + position.coords.longitude);
        setPositionLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const location = useLocation();
  const latPlace = parseFloat(location.state.lat);
  const lngPlace = parseFloat(location.state.lng);

  const onSubmit = async (data: IGenerateRoute) => {
    data.latFinal = latPlace;
    data.lngFinal = lngPlace;
    // if(positionLoc.latitude)
    data.latOrigin = positionLoc.lat;
    data.lngOrigin = positionLoc.lng;

    console.log("mes datas avant l'envoi pour generer la route", data);
    try {
      const response = await dispatch(generateRoute(data));
      console.log(
        'response sur mon composant routeselection',
        response.payload
      );
      navigate(`/${location.state.slug}`, {
        state: {
          routeGenerate: response.payload,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la génération de la route :', error);
    }
  };

  return (
    <Box
      sx={{
        border: '2px solid grey',
        p: 2,
        mb: 10,
        height: 600,
        overflowY: 'auto',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <select {...register('depart', { required: true })}>
          <option value="Toulouse">Toulouse</option>
          <option value=" paris"> paris</option>
        </select> */}
        <select {...register('transport', { required: true })}>
          <option value="">Select Mode</option>
          <option value="WALK">A pied</option>
          <option value="DRIVE">En voiture</option>
          <option value="BICYCLE">A vélo</option>
          <option value="TRANSIT">Transport en commun</option>
        </select>
        <input
          type="datetime-local"
          placeholder="Jour et heure du départ"
          {...register('datetime', { required: true })}
        />

        <input type="submit" />
      </form>
    </Box>
  );
}

export default RouteSelection;
