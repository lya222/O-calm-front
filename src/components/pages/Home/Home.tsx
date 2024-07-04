import CardPlace from '../../elements/CardPlace/CardPlace';
import { useAppSelector } from '../../../hooks/redux';
import { Box } from '@mui/material';
import { Places } from '../../../@types/places';

function Home() {
  const places = useAppSelector((state) => state.places.list);
  console.log('state du home', places);

  return (
    <Box>
      {places.map((place: Places, index: number) => {
        return <CardPlace key={index} place={place} index={index} />;
      })}
    </Box>
  );
}

export default Home;
