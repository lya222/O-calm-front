import { Button, Card, CardContent, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Places } from '../../../@types/places';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import '../../../assets/fonts/fonts.css';

interface CardPlaceProp {
  place: Places;
  index: number;
}

function CardPlace({ place, index }: CardPlaceProp) {
  // console.log("state du la petite carte ", place);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  return (
    <Card sx={{ borderRadius: 5, padding: 5, margin: 5 }} key={index}>
      <Carousel>
        {/* {place.picture.map((picture, index) => (
          <CardMedia key={index} component="img" height="200" image={picture} />
        ))} */}
      </Carousel>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ fontFamily: 'Bion' }}
          component="div"
        >
          {place.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Bion' }}
          color="text.primary"
        >
          Description du lieu
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {place.description}
        </Typography>
        {isLogged ? (
          <Button component={Link} to={`/${place.slug}`} variant="contained">
            VOir le site
          </Button>
        ) : (
          <Button disabled variant="contained" sx={{ fontFamily: 'Bion' }}>
            Connectez vous pour voir ce site
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default CardPlace;
