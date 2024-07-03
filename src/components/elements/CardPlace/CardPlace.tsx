import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Places } from '../../../@types/places';
import { Link } from 'react-router-dom';

interface CardPlaceProp {
  place: Places;
  index: number;
}

function CardPlace({ place, index }: CardPlaceProp) {
  // console.log("state du la petite carte ", place);
  return (
    <Card sx={{ borderRadius: 5, padding: 5, margin: 5 }} key={index}>
      <Carousel>
        {place.images.map((picture, index) => (
          <CardMedia
            key={index}
            component="img"
            height="200"
            image={picture}
            alt="photo lieu"
          />
        ))}
      </Carousel>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {place.name}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Description du lieu
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {place.description}
        </Typography>
        <Button component={Link} to={`/${place.slug}`} variant="contained">
          VOir le site
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardPlace;
