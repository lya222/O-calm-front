import { Box, Button } from '@mui/material';
import './PlaceOnMaps.scss';
import {
  Map,
  APIProvider,
  Marker,
  MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { SyntheticEvent, useState } from 'react';
import { Iposition } from '../../../@types/Map';

type PlaceOnMapsProps = {
  setPosition: (position: Iposition) => void;
  handleClose: (event: SyntheticEvent) => void;
};

function PlaceOnMaps({ setPosition, handleClose }: PlaceOnMapsProps) {
  const apikey = import.meta.env.VITE_API_MAP_KEY;
  const positionMap = { lat: 45, lng: 5 };
  const [positionPlace, setPositionPlace] = useState<Iposition>();
  const [isdisable, setIsDisable] = useState(true);
  const handleposition = (e: MapMouseEvent) => {
    if (e.detail.latLng) {
      setPositionPlace(e.detail.latLng);
      setIsDisable(false);
    }
  };
<<<<<<< HEAD

=======
  
>>>>>>> developement
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (positionPlace) setPosition(positionPlace);
    handleClose(event);
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
      <APIProvider apiKey={apikey}>
        <Map
          defaultCenter={positionMap}
          defaultZoom={5}
          onClick={handleposition}
        >
          <Marker position={positionPlace} />
        </Map>
      </APIProvider>
      <Button
        onClick={handleSubmit}
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
