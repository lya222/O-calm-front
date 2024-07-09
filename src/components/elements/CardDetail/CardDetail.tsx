import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel from 'react-material-ui-carousel';
// import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import { findPlace } from '../../../store/selectors/places';
import { Places } from '../../../@types/places';
import '../../../assets/fonts/fonts.css';

function CardDetail() {
  const { slug } = useParams<{ slug: string }>();
  const place: Places | undefined = useAppSelector((state) =>
    findPlace(state.places.list, slug as string)
  );
  // const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  // useEffect(() => {
  //   if (place) {
  //     setCheckedItems(new Array(place.journey.length).fill(false));
  //   }
  // }, [place]);
  if (!place) {
    // Gérer le cas où place est undefined
    return <div>Place not found</div>;
  }

  // const handleCheckBoxChange = (index: number) => {
  //   const newCheckedItems = [...checkedItems];
  //   newCheckedItems[index] = !newCheckedItems[index];
  //   setCheckedItems(newCheckedItems);
  // };

  return (
    <Box
      sx={{
        border: '2px solid grey',
        p: 2,
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
          {/* {place.journey.map((etape, i) => (
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
          ))} */}
        </AccordionDetails>
      </Accordion>

      <Stack direction="row" spacing={4} justifyContent="center">
        <Button color="success">Modifier</Button>
        <Button variant="outlined" color="error">
          Supprimer
        </Button>
      </Stack>
    </Box>
  );
}

export default CardDetail;
