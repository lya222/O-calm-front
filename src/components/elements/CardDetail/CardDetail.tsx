import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardMedia,
  Checkbox,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel from 'react-material-ui-carousel';
// import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { findPlace } from '../../../store/selectors/places';
import { Places } from '../../../@types/places';
import '../../../assets/fonts/fonts.css';
import { useEffect, useState } from 'react';
import { deletePlace } from '../../../store/reducers/placesReducer';
import RouteSelection from '../RouteSelection/RouteSelection';

function CardDetail() {
  const dispatch = useAppDispatch();
  // const location = useLocation();
  const [toogleGeolocalisation, setToogleGeolocalisation] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const iduser: number = useAppSelector((state) => state.user.id);
  const place: Places | undefined = useAppSelector((state) =>
    findPlace(state.places.list, slug as string)
  );
  const [routes, setRoutes] = useState(place?.journey);
  const [routesByUser, setRoutesByUser] = useState(true);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  // useEffect(() => {
  // if (location.state.routeGenerate) setRoutes(location.state.routeGenerate);
  // }, [location.state.routeGenerate]);
  // useEffect(() => {
  //   if (location.state && location.state.routeGenerate) {
  //     setRoutes(location.state.routeGenerate);
  //     setRoutesByUser(false);
  //   }
  // }, [location.state]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useEffect(() => {
    if (place) {
      setCheckedItems(new Array(place.journey.length).fill(false));
    }
  }, [place]);
  if (!place) {
    // Gérer le cas où place est undefined
    return <div>Place not found</div>;
  }

  const handleCheckBoxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleGenerateRoute = () => {
    // navigate(`/${slug}/generateRoute`, {
    //   state: {
    //     lat: place.gps_location_latitude,
    //     lng: place.gps_location_longitude,
    //     slug: place.slug,
    //   },
    // });
    setToogleGeolocalisation((prev) => !prev);
  };

  const handleDeletePlace = async () => {
    const response = await dispatch(deletePlace(place.id));
    if (deletePlace.fulfilled.match(response)) {
      alert('Le lieu a bien était suprimer');
      navigate('/');
    }
  };
  if (!isLogged) {
    navigate('/login');
    return null;
  }

  return (
    <Box
      sx={{
        border: '2px solid grey',
        p: 2,
        mb: 10,
        overflowY: 'auto',
        height: '50vh'
      }}
    >
      <Typography variant="h3" gutterBottom>
        {place.name}
      </Typography>
      <Stack direction="row" spacing={1}>
        {/* {place.tag.map((t) => (
          <Chip
            key={t.id}
            label={t.name}
            sx={{ background: t.color, color: 'white' }}
          />
        ))} */}
      </Stack>
      {place.picture ? (
        <Carousel>
          {place.picture.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              height="200"
              image={image}
              alt={`Photo du lieu ${place.name} - ${index + 1} sur ${
                place.picture.length
              }`}
            />
          ))}
        </Carousel>
      ) : (
        ''
      )}
      <Typography variant="h5" gutterBottom>
        {place.description}
      </Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panell-content"
          id="panell-header"
        >
          {routesByUser
            ? 'Chemin proposé par le créateur'
            : 'Chemin proposé par Google Maps'}
        </AccordionSummary>
        <AccordionDetails>
          {routes?.map((etape, i) => (
            <div key={i}>
              <Typography
                variant="h6"
                sx={{
                
                  textDecoration: checkedItems[i] ? 'line-through' : 'none',
                }}
              >
                <Checkbox
                  checked={checkedItems[i]}
                  onChange={() => handleCheckBoxChange(i)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />{' '}
                {i} - {etape}
              </Typography>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
      <Button
        onClick={handleGenerateRoute}
        fullWidth
        variant="contained"
        color="primary"
        aria-label="Générer l'itinéraire"
        sx={{ mt: 3, mb: 2, fontFamily: 'Bion, Arial, sans-serif' }}
      >
        Créer un trajet avec Google Maps
      </Button>
      {toogleGeolocalisation ? (
        <RouteSelection
          latFinal={parseFloat(place.gps_location_latitude)}
          lngFinal={parseFloat(place.gps_location_longitude)}
          setRoutes={setRoutes}
          setRoutesByUser={setRoutesByUser}
          setToogleGeolocalisation={setToogleGeolocalisation}
        />
      ) : (
        ''
      )}

      <Stack direction="row" spacing={4} justifyContent="center">
        {iduser === place.user_id ? (

          <Button className='ButtonContainer' sx={{
       
            pt: '7vh',
          }}>
    
           <Button color="success" aria-label="Modification de l'itinéraire">Modifier</Button
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeletePlace}
              aria-label="Suppression de l'itinéraire"
            >
              Supprimer
            </Button>
          </Button>
        ) : (
          ''
        )}
      </Stack>
    </Box>
  );
}

export default CardDetail;
