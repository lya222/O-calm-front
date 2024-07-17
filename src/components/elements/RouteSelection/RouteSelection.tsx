import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  IGenerateRoute,
  IGenerateRouteForAPIGoogle,
} from '../../../@types/Map';
import { useEffect, useState } from 'react';
import {
  dataForMap,
  generateRoute,
  transformNewRoute,
} from '../../../store/selectors/map';

interface IRouteSelectionProps {
  latFinal: number;
  lngFinal: number;
  setRoutes: (data: string[]) => void;
  setRoutesByUser: (toogleRoutes: boolean) => void;
  setToogleGeolocalisation: (toogleDIsplay: boolean) => void;
}

function RouteSelection({
  latFinal,
  lngFinal,
  setRoutes,
  setRoutesByUser,
  setToogleGeolocalisation,
}: IRouteSelectionProps) {
  // const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IGenerateRoute>();
  const [positionLoc, setPositionLoc] = useState({ lat: 0, lng: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    //Search your localisation
    if ('geolocation' in navigator) {
      console.log('Geolocation is available');
      navigator.geolocation.getCurrentPosition(function (position) {
        setPositionLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const onSubmit = async (data: IGenerateRoute) => {
    data.latFinal = latFinal;
    data.lngFinal = lngFinal;
    data.latOrigin = positionLoc.lat;
    data.lngOrigin = positionLoc.lng;
    try {
      const dataFromAPI: IGenerateRouteForAPIGoogle = dataForMap(
        data as IGenerateRoute
      );
      const response = await generateRoute(dataFromAPI);
      const dataRoute = transformNewRoute(response);

      if (dataRoute) {
        setRoutes(dataRoute);
        setRoutesByUser(false);
        setToogleGeolocalisation(false);
      } else {
        setErrorMessage("Aucune Route n'a était trouvé");
      }
    } catch (error) {
      console.error('Erreur lors de la génération de la route :', error);
      setErrorMessage("Aucune Route n'a était trouvé");
    }
  };

  return (
    <Box
      sx={{
        border: '2px solid grey',
        p: 2,
        mb: 0,
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
      <Typography color="red">{errorMessage}</Typography>
    </Box>
  );
}

export default RouteSelection;
