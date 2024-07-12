import { Box, Button } from '@mui/material';
import './PlaceOnMaps.scss';
import {
  Map,
  APIProvider,
  Marker,
  MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Iposition } from '../../../@types/Map';

type PlaceOnMapsProps = {
  setPosition: (position: Iposition) => void;
  handleClose: () => void;
};

function PlaceOnMaps({ setPosition, handleClose }: PlaceOnMapsProps) {
  const positionMap = { lat: 45, lng: 5 };
  const [positionPlace, setPositionPlace] = useState<Iposition>();
  const [isdisable, setIsDisable] = useState(true);
  const handleposition = (e: MapMouseEvent) => {
    console.log('ma position', e.detail.latLng);
    if (e.detail.latLng) {
      setPositionPlace(e.detail.latLng);
      setIsDisable(false);
    }
  };

  // const [markerRef, marker] = useMarkerRef();

  // useEffect(() => {
  //   if (!marker) {
  //     return;
  //   }

  //   // do something with marker instance here
  // }, [marker]);
  const handleSubmit = () => {
    if (positionPlace) setPosition(positionPlace);
    handleClose();
  };

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
      component="form"
      onSubmit={handleSubmit}
    >
      <APIProvider apiKey={'AIzaSyCHGir6dmR_WAy9A4aehjFV32OiGY4aDKw'}>
        <Map
          defaultCenter={positionMap}
          defaultZoom={5}
          onClick={handleposition}
        >
          <Marker position={positionPlace} />
        </Map>
      </APIProvider>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isdisable}
        sx={{ mt: 3, mb: 2, fontFamily: 'Bion, Arial, sans-serif' }}
      >
        Valider la position de mon lieu
      </Button>
    </Box>
  );
}

export default PlaceOnMaps;
