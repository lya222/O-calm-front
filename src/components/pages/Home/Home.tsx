import CardPlace from "../../elements/CardPlace/CardPlace";
import { useAppSelector } from "../../../hooks/redux";
import { Box } from "@mui/material";

function Home() {
  const places = useAppSelector((state) => state.places.list);
  console.log("state du home", places);

  return (
    <Box sx={{ overflowY: "auto", height: "200px", flexGrow: 1 }}>
      {places.map((place, index) => {
        return <CardPlace key={index} place={place} index={index} />;
      })}
    </Box>
  );
}

export default Home;
