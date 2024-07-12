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

function CardDetail() {
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const iduser: number = useAppSelector((state) => state.user.id);
  const place: Places | undefined = useAppSelector((state) =>
    findPlace(state.places.list, slug as string)
  );
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

  const handleDeletePlace = async () => {
    const response = await dispatch(deletePlace(place.id));
    if (deletePlace.fulfilled.match(response)) {
      alert('Le lieu a bien était suprimer');
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        border: '2px solid grey',
        p: 2,
        mb: 10,
        overflowY: 'auto',
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
              alt="photo lieu"
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
          Chemin a suivre
        </AccordionSummary>
        <AccordionDetails>
          {place.journey.map((etape, i) => (
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

      <Stack direction="row" spacing={4} justifyContent="center">
        {iduser === place.user_id ? (
          <>
            <Button color="success">Modifier</Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeletePlace}
            >
              Supprimer
            </Button>
          </>
        ) : (
          ''
        )}
      </Stack>
    </Box>
  );
}

export default CardDetail;
