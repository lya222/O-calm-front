import { redirect } from 'react-router-dom';
import { Places } from '../../@types/places';

export function findPlace(places: Places[], searchSlug: string) {
  const result = places.find((place) => {
    return place.slug === searchSlug;
  });
  if (!result) redirect('/404');
  else return result;
}

export function sortTag(places: Places[]) {
  const newObject = new Set();
  places.forEach((obj) => {
    obj.tag.forEach((tag) => {
      newObject.add(tag.name);
    });
  });
  const result = Array.from(newObject);
  return result as string[];
}
