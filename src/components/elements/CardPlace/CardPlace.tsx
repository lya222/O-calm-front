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
import {
  addFavorite,
  deleteFavorite,
} from '../../../store/reducers/userReducer';
import { AppDispatch } from '../../../store';
import { IFavorite } from '../../../@types/Favorites';

interface CardPlaceProp {
  place: Places;
  index: number;
}

function CardPlace({ place, index }: CardPlaceProp) {
  const dispatch = useDispatch<AppDispatch>();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const iduser = useAppSelector((state) => state.user.id);
  const listFavorite: IFavorite[] = useAppSelector(
    (state) => state.user.favorite
  );
  const [favorite, setFavorite] = useState<IFavorite>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (listFavorite && listFavorite.length > 0) {
      const takeFavorite = listFavorite.find(
        (fav: IFavorite) => fav.place_id === place.id
      );
      if (takeFavorite) {
        setIsFavorite(true);
        setFavorite(takeFavorite);
      } else {
        setFavorite(undefined);
        setIsFavorite(false);
      }
    }
  }, [listFavorite, place.id, favorite]);

  const handleFavorite = async (idUser: number, idPlace: number) => {
    if (!isFavorite) {
      await dispatch(addFavorite({ idUser, idPlace }));
      setIsFavorite(true);
    } else {
      await dispatch(deleteFavorite({ idUser, fav_id: favorite?.fav_id }));
      setIsFavorite(false);
    }
  };
  return (
    <Card sx={{ borderRadius: 5, padding: 5, margin: 0 }} key={index}>
      {!place.picture || !Array.isArray(place.picture) ? (
        <CardMedia />
      ) : (
        <Carousel>
          {place.picture.map((picture, index) => (
            <CardMedia
              key={index}
              component="img"
              height="200"
              src={picture}
              aria-label={`Image ${index + 1} sur ${place.picture.length}`}
            />
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
          <Button
            component={Link}
            to={`/${place.slug}`}
            variant="contained"
            sx={{ fontFamily: 'Bion', backgroundColor: '#2e7d32' }}
            aria-label="Acceder au lieu"
          >
            Voir le site
          </Button>
        ) : (
          <Button
            disabled
            variant="contained"
            sx={{ fontFamily: 'Bion' }}
            aria-label="Connexion afin de voir le lieu"
          >
            Connectez vous pour voir ce site
          </Button>
        )}
        {isLogged && (
          <IconButton
            aria-label="favorite"
            onClick={() => handleFavorite(iduser, place.id)}
          >
            <FavoriteIcon color={isFavorite ? 'error' : 'inherit'} />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
}

export default CardPlace;
