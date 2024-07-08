import CardPlace from '../../elements/CardPlace/CardPlace';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../../hooks/redux';
import { Box } from '@mui/material';
import { Places } from '../../../@types/places';

function Home() {
  const places = useAppSelector((state) => state.places.list);

  return (
    <Box>
      {places.map((place: Places, index: number) => {
        return (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <CardPlace key={index} place={place} index={index} />
          </motion.div>
        );
      })}
    </Box>
  );
}

export default Home;
