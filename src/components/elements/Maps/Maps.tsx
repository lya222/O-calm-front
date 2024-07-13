import { Box } from '@mui/material';
import './Maps.scss';
import { Map, APIProvider, Marker } from '@vis.gl/react-google-maps';
import { useAppSelector } from '../../../hooks/redux';
import { Iposition } from '../../../@types/Map';

function PlaceOnMaps() {
  const positionMap = { lat: 45, lng: 5 };
  const places = useAppSelector((state) => state.places.list);
  const positions: Iposition[] = places.map((place) => ({
    lat: parseFloat(place.gps_location_latitude),
    lng: parseFloat(place.gps_location_longitude),
  }));
  console.log('mes positions pour la map', positions);
  const apikey = import.meta.env.VITE_API_MAP_KEY;

  // const [markerRef, marker] = useMarkerRef();

  // useEffect(() => {
  //   if (!marker) {
  //     return;
  //   }

  //   // do something with marker instance here
  // }, [marker]);

  return (
    <Box
      id="map"
      sx={{
        mt: 3,
        mb: 20,
        width: 400,
        maxWidth: '100%',
        p: 2,
        bgcolor: 'white',
        color: 'black',
      }}
    >
      <APIProvider apiKey={apikey}>
        <Map defaultCenter={positionMap} defaultZoom={5}>
          {positions.map((position, index) => (
            <Marker key={index} position={position} />
          ))}
        </Map>
      </APIProvider>
    </Box>
  );
}

export default PlaceOnMaps;
