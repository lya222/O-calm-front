import { useAppSelector } from "../../../hooks/redux";

function Homes() {
  const places = useAppSelector((state) => state.places.list);

  return (
    <>
      {places.map((item) => (
        <div>{item.name} hello</div>
      ))}
    </>
  );
}

export default Homes;
