import { Box } from '@mui/material';
import './Maps.scss';
import {
  Map,
  APIProvider,
  Marker,
  useMarkerRef,
  MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

interface Iposition {
  lat: number;
  lng: number;
}

function Maps() {
  const position = { lat: 45, lng: 5 };
  const [positionPlace, setPositionPlace] = useState<Iposition>();
  const handleposition = (e: MapMouseEvent) => {
    console.log('ma position', e.detail.latLng);
    if (e.detail.latLng) setPositionPlace(e.detail.latLng);
  };
  const [markerRef, marker] = useMarkerRef();

  useEffect(() => {
    if (!marker) {
      return;
    }

    // do something with marker instance here
  }, [marker]);
  return (
    <Box
      id="map"
      sx={{
        mt: 3,
        mb: 10,
        width: 400,
        maxWidth: '100%',
        p: 2,
        bgcolor: 'white',
        color: 'black',
      }}
    >
      <APIProvider apiKey={'AIzaSyCHGir6dmR_WAy9A4aehjFV32OiGY4aDKw'}>
        <Map defaultCenter={position} defaultZoom={5} onClick={handleposition}>
          <Marker ref={markerRef} position={position} />
        </Map>
      </APIProvider>
    </Box>
  );
}

export default Maps;
