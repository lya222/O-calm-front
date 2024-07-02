import { redirect } from "react-router-dom";
import { Places } from "../../@types/places";

export function findPlace(places: Places[], searchSlug: string) {
  const result = places.find((place) => {
    return place.slug === searchSlug;
  });
  console.log("selector place", result);
  if (!result) redirect("/404");
  else return result;
}
