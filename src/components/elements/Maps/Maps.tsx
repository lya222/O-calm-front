import { Box } from '@mui/material';
import './Maps.scss';
import { Map, APIProvider, Marker } from '@vis.gl/react-google-maps';
import { useAppSelector } from '../../../hooks/redux';
import CardPlace from '../CardPlace/CardPlace';
import { useState } from 'react';
import { Places } from '../../../@types/places';
import { motion } from 'framer-motion';

function PlaceOnMaps() {
  const positionMap = { lat: 45, lng: 5 };
  const places = useAppSelector((state) => state.places.list);

  const apikey = import.meta.env.VITE_API_MAP_KEY;

  //function for cardPlace display
  const [open, setOpen] = useState(false);
  const [choicePlace, setChoicePlace] = useState<Places>();
  const handleOpen = async (place: Places) => {
    if (open) {
      await setOpen(false);
      setChoicePlace(place);
      setOpen(true);
    } else {
      setOpen(true);
      setChoicePlace(place);
    }
  };
  const handleClose = () => setOpen(false);

  const cardPlaceDisplay = {
    visible: { x: 0, opacity: 1, rotate: 0 },
    hidden: { x: 100, opacity: 0, rotate: 45 },
  };

  return (
    <Box
      id="map"
      sx={{
        mt: 0,
        mb: 20,
        width: 400,
        maxWidth: '100%',
        p: 2,
        bgcolor: 'white',
        color: 'black',
      }}
    >
      <motion.div
        variants={cardPlaceDisplay}
        animate={open ? 'visible' : 'hidden'}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          width: '100%',
          zIndex: 999,
        }}
      >
        {choicePlace && <CardPlace place={choicePlace} index={1} />}
      </motion.div>

      <APIProvider apiKey={apikey}>
        <Map defaultCenter={positionMap} defaultZoom={5}>
          {places.map((place, index) => (
            <>
              <Marker
                key={index}
                position={{
                  lat: parseFloat(place.gps_location_latitude),
                  lng: parseFloat(place.gps_location_longitude),
                }}
                onClick={() => handleOpen(place as Places)}
              />

              {/* <Box onClose={handleClose}></Box> */}
            </>
          ))}
        </Map>
      </APIProvider>
    </Box>
  );
}

export default PlaceOnMaps;
