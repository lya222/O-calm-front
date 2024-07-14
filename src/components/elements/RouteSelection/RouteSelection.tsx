import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  IGenerateRoute,
  IGenerateRouteForAPIGoogle,
} from '../../../@types/Map';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  dataForMap,
  generateRoute,
  transformNewRoute,
} from '../../../store/selectors/map';

function RouteSelection() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IGenerateRoute>();
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
    data.latOrigin = positionLoc.lat;
    data.lngOrigin = positionLoc.lng;
    try {
      const dataFromAPI: IGenerateRouteForAPIGoogle = dataForMap(
        data as IGenerateRoute
      );
      const response = await generateRoute(dataFromAPI);
      const dataRoute = transformNewRoute(response);
      navigate(`/${location.state.slug}`, {
        state: {
          routeGenerate: dataRoute,
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
        mb: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register('transport', { required: true })}>
          <option value="">Select Mode</option>
          <option value="WALK">A pied</option>
          <option value="DRIVE">En voiture</option>
          <option value="BICYCLE">A vélo</option>
          <option value="TRANSIT">Transport en commun</option>
        </select>
        <input type="submit" />
      </form>
    </Box>
  );
}

export default RouteSelection;
