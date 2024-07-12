import CardPlace from '../../elements/CardPlace/CardPlace';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../../hooks/redux';
import { Box } from '@mui/material';
import { Places } from '../../../@types/places';
import '../../../assets/fonts/fonts.css';
import { Loader } from '../../elements/Loader/Loader';
import '../../elements/Loader/Loader.scss';

function Home() {
  const takePlaces = useAppSelector((state) => state.places.list);
  const search = useAppSelector((state) => state.places.search);
  const loading = useAppSelector((state) => state.places.loading)
  let places: Places[] = takePlaces;

  if (search != '') {
    const newArray = takePlaces.filter((place) =>
      place.name.toLocaleLowerCase().includes(search.toLowerCase())
    );
    console.log('mon nouveau tableau', search);
    places = newArray;
  }

  console.log('resultat de ma recherche', takePlaces);

    if (loading) {
      return <Loader/>;
    }

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
