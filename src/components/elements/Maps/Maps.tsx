import { Box } from '@mui/material';
import './Maps.scss';
import {
  Map,
  APIProvider,
  Marker,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { useAppSelector } from '../../../hooks/redux';
import CardPlace from '../CardPlace/CardPlace';
import { useCallback, useState } from 'react';
import { Places } from '../../../@types/places';
import { motion } from 'framer-motion';

function PlaceOnMaps() {
  const places = useAppSelector((state) => state.places.list);
  const apikey = import.meta.env.VITE_API_MAP_KEY;

  const [positionMap, setPositionMap] = useState({ lat: 45, lng: 5 });
  const [zoomMap, setZoomMap] = useState(5);
  const [open, setOpen] = useState(false);
  const [choicePlace, setChoicePlace] = useState<Places | null>(null);

  const handleOpen = (place: Places) => {
    setChoicePlace(place);
    setPositionMap({
      lat: parseFloat(place.gps_location_latitude),
      lng: parseFloat(place.gps_location_longitude),
    });
    setZoomMap(12);
    setOpen(true);
  };

  const cardPlaceDisplay = {
    visible: { x: 0, opacity: 1, rotate: 0 },
    hidden: { x: 100, opacity: 0, rotate: 45 },
  };

  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    const { center, zoom } = ev.detail;
    setPositionMap(center);
    setZoomMap(zoom);
  }, []);

  return (
    <Box
      id="map"
      sx={{
        mt: 0,
        mb: 60,
        width: '100%',
        maxWidth: '100%',
        height: '600px',

        bgcolor: 'white',
        color: 'black',
        position: 'relative',
      }}
    >
      <motion.div
        variants={cardPlaceDisplay}
        animate={open ? 'visible' : 'hidden'}
        transition={{ duration: 0.3 }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
        }}
      >
        {choicePlace && <CardPlace place={choicePlace} index={1} />}
      </motion.div>

      <APIProvider apiKey={apikey}>
        <Map
          center={positionMap}
          zoom={zoomMap}
          onCameraChanged={handleCameraChange}
        >
          {places.map((place, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(place.gps_location_latitude),
                lng: parseFloat(place.gps_location_longitude),
              }}
              onClick={() => handleOpen(place as Places)}
            />
          ))}
        </Map>
      </APIProvider>
    </Box>
  );
}

export default PlaceOnMaps;
