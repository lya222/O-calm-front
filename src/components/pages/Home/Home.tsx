import CardPlace from "../../elements/CardPlace/CardPlace";
import { useAppSelector } from "../../../hooks/redux";

function Home() {
  console.log("state du home");
  const places = useAppSelector((state) => state.places.list);

  return (
    <>
      {places.map((place, index) => {
        <CardPlace place={place} index={index} />;
      })}
    </>
  );
}

export default Home;
