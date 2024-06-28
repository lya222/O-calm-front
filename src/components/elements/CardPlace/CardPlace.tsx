import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function CardPlace() {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image="/image/image.png"
        alt="photo lieu"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          La description du lieu Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nulla voluptatem cum sed officiis magnam molestias
          doloremque voluptatum fuga aut rerum quam, eius incidunt provident rem
          repellat quae reprehenderit nihil adipisci!
        </Typography>
      </CardContent>{" "}
    </Card>
  );
}

export default CardPlace;
