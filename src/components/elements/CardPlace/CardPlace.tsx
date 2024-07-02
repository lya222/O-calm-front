import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { useAppSelector } from "../../../hooks/redux";
import { loadPlaces } from "../../../store/reducers/placesReducer";

function CardPlace() {
  console.log("CardPlace component rendered");
  // const item = {
  //   nom: "Pokemon City",
  //   description: "Ceci est la description de pokemon city",
  //   images: ["/image/image.png", "/image/pokemon2.png"],
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  const items = useAppSelector((state) => state.places.list);
  const isLoading = useAppSelector((state) => state.places.loading);
  const error = useAppSelector((state) => state.places.error);

  console.log("places", items);
  console.log("isLoading", isLoading);
  console.log("error", error);

  if (items.length === 0) {
    console.log(isLoading);
    return <div>Aucun lieu trouvé</div>;
  }
  return (
    <>
      {/* {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
          <div>essai</div>
        </Box>
      ) : ( */}
      {items.map((item, i) => (
        <Card
          sx={{ maxWidth: 300, borderRadius: 5, padding: 5, m: "auto" }}
          key={i}
        >
          <Carousel>
            {item.images.map((picture, index) => (
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
              {item.name}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Description du lieu
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Button variant="contained" disableElevation>
              Voir le site
            </Button>
          </CardContent>
        </Card>
      ))}
      {/* )} */}
    </>
  );
}

export default CardPlace;
