import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Places } from "../../../@types/places";

interface CardPlaceProp {
  place: Places;
  index: number;
}

function CardPlace({ place, index }: CardPlaceProp) {
  return (
    <Card
      sx={{ maxWidth: 300, borderRadius: 5, padding: 5, m: "auto" }}
      key={index}
    >
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
        <Button variant="contained" disableElevation>
          Voir le site
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardPlace;
