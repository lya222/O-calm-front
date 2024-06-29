import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardMedia,
  Checkbox,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Carousel from "react-material-ui-carousel";
import { useState } from "react";

function CardDetail() {
  const item = {
    nom: "Pokemon City",
    description: "Ceci est la description de pokemon city",
    route: [
      "Prendre le bus 12",
      "marcher 300 mètres en direction de la gare",
      "reprendre le bus 12",
      "Vous etes arrivé",
    ],
    tag: [
      { id: 1, name: "mer", color: "red" },
      { id: 2, name: "montagne", color: "green" },
    ],
    images: ["/image/image.png", "/image/pokemon2.png"],
  };

  const [checkedItems, setCheckedItems] = useState(
    new Array(item.route.length).fill(false)
  );

  const handleCheckBoxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <Box
      sx={{
        border: "2px solid grey",
        p: 2,
        m: "auto",
      }}
    >
      <Typography variant="h3" gutterBottom>
        {item.nom}
      </Typography>
      <Stack direction="row" spacing={1}>
        {item.tag.map((t) => (
          <Chip label={t.name} sx={{ background: t.color, color: "white" }} />
        ))}
      </Stack>
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
      <Typography variant="h5" gutterBottom>
        {item.description}
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
          {item.route.map((etape, i) => (
            <div key={i}>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: checkedItems[i] ? "line-through" : "none",
                }}
              >
                <Checkbox
                  checked={checkedItems[i]}
                  onChange={() => handleCheckBoxChange(i)}
                  inputProps={{ "aria-label": "controlled" }}
                />{" "}
                {i} - {etape}
              </Typography>
            </div>
          ))}
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
