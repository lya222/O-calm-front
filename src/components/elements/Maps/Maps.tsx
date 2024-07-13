import { Box } from '@mui/material';
import './Maps.scss';
import { Map, APIProvider, Marker } from '@vis.gl/react-google-maps';

function PlaceOnMaps() {
  const positionMap = { lat: 45, lng: 5 };

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
      <APIProvider apiKey={'AIzaSyCHGir6dmR_WAy9A4aehjFV32OiGY4aDKw'}>
        <Map defaultCenter={positionMap} defaultZoom={5}>
          <Marker position={positionMap} />
        </Map>
      </APIProvider>
    </Box>
  );
}

export default PlaceOnMaps;
