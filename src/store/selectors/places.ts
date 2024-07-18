import { redirect } from 'react-router-dom';
import { Places } from '../../@types/places';

export function findPlace(places: Places[], searchSlug: string) {
  const result = places.find((place) => {
    return place.slug === searchSlug;
  });
  if (!result) {
    redirect('/404');
    return undefined;
  } else return result;
}

// Implementer pour trier les tags
// export function sortTag(places: Places[]) {
//   const newObject = new Set();
//   places.forEach((obj) => {
//     obj.tag.forEach((tag) => {
//       newObject.add(tag.name);
//     });
//   });
//   const result = Array.from(newObject);
//   return result as string[];
// }

export function createSlug(placeName: string): string {
  return placeName
    .toLowerCase() // Convertit en minuscules
    .normalize('NFD') // Normalise les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/['’]/g, '') // Supprime les apostrophes (simple et courbe
    .replace(/[^a-z0-9]+/g, '-') // Remplace les espaces et autres caractères non alphanumériques par des tirets
    .replace(/(^-|-$)/g, ''); // Supprime les tirets en début et fin de chaîne
}
