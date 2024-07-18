import CardPlace from '../../elements/CardPlace/CardPlace';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../../hooks/redux';
import { Box, Typography } from '@mui/material';
import { Places } from '../../../@types/places';
import '../../../assets/fonts/fonts.css';
import { Loader } from '../../elements/Loader/Loader';
import '../../elements/Loader/Loader.scss';
import { useEffect, useState } from 'react';
import ButtonFilter from './ButtonFilter/ButtonFilter';

function Home() {
  // const isMobile = useMediaQuery('(max-width:600px)');
  const takePlaces = useAppSelector((state) => state.places.list);
  const search = useAppSelector((state) => state.places.search);
  const loading = useAppSelector((state) => state.places.loading);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const [filterPlace, setFilterPlace] = useState('Tous les lieux');
  const [resultFilterPlace, setResultFIlterPlace] =
    useState<Places[]>(takePlaces);
  const favorite = useAppSelector((state) => state.user.favorite);
  const user_id = useAppSelector((state) => state.user.id);

  useEffect(() => {
    let filtered: Places[] = takePlaces;

    if (search !== '') {
      filtered = filtered.filter((place) =>
        place.name.toLocaleLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterPlace === 'Mes Favoris') {
      filtered = filtered.filter((place) =>
        favorite.some((fav) => fav.place_id === place.id)
      );
    } else if (filterPlace === 'Mes Lieux créés') {
      filtered = filtered.filter((place) => place.user_id === user_id);
    }

    setResultFIlterPlace(filtered);
  }, [filterPlace, search, takePlaces, favorite, user_id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      {isLogged ? (
        <ButtonFilter setFilterPlace={setFilterPlace} />
      ) : (
        <>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontFamily: 'Bion', textAlign: 'center' }}
          >
            Bienvenue sur le site O'calm.
          </Typography>
          <Typography gutterBottom sx={{ fontFamily: 'Bion' }}>
            {' '}
            Ici, vous pourrez trouver des lieux reposants à côté de chez vous.
          </Typography>
          <Typography gutterBottom sx={{ fontFamily: 'Bion' }}>
            {' '}
            Partagez vos endroits et découvrez les sites proposés par la
            communauté en vous connectant.
          </Typography>
        </>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {resultFilterPlace.map((place: Places, index: number) => {
          return (
            <motion.div
              key={place.id}
              layout
              // initial={{ opacity: 0, scale: 0.5 }}
              // animate={{ opacity: 1, scale: 1 }}
              // transition={{
              //   duration: 0.8,
              //   delay: 0.5,
              //   ease: [0, 0.71, 0.2, 1.01],
              // }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardPlace key={index} place={place} index={index} />
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}

export default Home;
