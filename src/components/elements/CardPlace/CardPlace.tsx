import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

function CardPlace() {
  const items = [
    {
      image: "/image/image.png",
    },
    {
      image: "/image/pokemon2.png",
    },
  ];
  return (
    <Card sx={{ maxWidth: 300 }}>
      <Carousel>
        {items.map((item, i) => (
          <CardMedia
            key={i}
            component="img"
            height="200"
            image={item.image}
            alt="photo lieu"
          />
        ))}
      </Carousel>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Nom du lieu
        </Typography>
        <Typography variant="h6" color="text.primary">
          Description du lieu
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolorem
          rerum animi fugit quibusdam! Deserunt accusantium cum iste tempora
          tempore corrupti architecto nihil vitae! Quam aspernatur totam
          possimus asperiores laborum.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardPlace;
