import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

function CardPlace() {
  const item = {
    nom: "Pokemon City",
    description: "Ceci est la description de pokemon city",
    images: ["/image/image.png", "/image/pokemon2.png"],
  };
  return (
    <Card sx={{ maxWidth: 300, borderRadius: 5, padding: 5, m: "auto" }}>
      <Carousel>
        {item.images.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            height="200"
            image={image}
            alt="photo lieu"
          />
        ))}
      </Carousel>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.nom}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Description du lieu
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardPlace;
