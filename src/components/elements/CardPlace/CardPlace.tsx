import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Places } from '../../../@types/places';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import '../../../assets/fonts/fonts.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../../../store/reducers/userReducer';
import { AppDispatch } from '../../../store';

interface CardPlaceProp {
  place: Places;
  index: number;
}

function CardPlace({ place, index }: CardPlaceProp) {
  // console.log("state du la petite carte ", place);
  const dispatch = useDispatch<AppDispatch>();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const iduser = useAppSelector((state) => state.user.id);
  const listFavorite = useAppSelector((state) => state.user.favorite);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(listFavorite.includes(place.id));
  }, [listFavorite]);

  const handleFavorite = async (idUser: number, idPlace: number) => {
    const response = await dispatch(addFavorite({ idUser, idPlace }));
    console.log('ma réponse pour addfavorite', response);
  };

  console.log('isfavorite', isFavorite);
  return (
    <Card sx={{ borderRadius: 5, padding: 5, margin: 5 }} key={index}>
      {!place.picture || !Array.isArray(place.picture) ? (
        <CardMedia />
      ) : (
        <Carousel>
          {place.picture.map((picture, index) => (
            <CardMedia key={index} component="img" height="200" src={picture} />
          ))}
        </Carousel>
      )}

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
        <IconButton
          aria-label="favorite"
          onClick={() => handleFavorite(iduser, place.id)}
        >
          <FavoriteIcon color={isFavorite ? 'error' : 'inherit'} />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default CardPlace;
