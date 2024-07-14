// import axios from 'axios';

import axios from 'axios';

// const placeData = {
//   description: 'blal',
//   journey: ['bla', 'bla'],
//   name: 'blublu',
//   // slug: 'blal',
//   user_id: 15,
// };

// const response = async () => {
//   console.log('geolocalisation', usePosition);
//   // const response = await axios.delete(`http://165.22.25.11:4000/places/12 `);
//   // console.log(
//   //   "renvoie apres l'enregistrement d'un nouveau lieu",
//   //   response.data
//   // );
// };

// response();

// if ('geolocation' in navigator) {
//   console.log('Geolocation is available');
//   navigator.geolocation.getCurrentPosition(function (position) {
//     console.log('Latitude: ' + position.coords.latitude);
//     console.log('Longitude: ' + position.coords.longitude);
//   });
// } else {
//   console.log('Geolocation is not available');
// }

const essai = async () => {
  const apikey = 'AIzaSyCHGir6dmR_WAy9A4aehjFV32OiGY4aDKw';
  // const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=cities+in+France&key=${apikey}`;
  // const data = {
  //   origin: {
  //     location: {
  //       latLng: {
  //         latitude: 37.419734,
  //         longitude: -122.0827784,
  //       },
  //     },
  //   },
  //   destination: {
  //     location: {
  //       latLng: {
  //         latitude: 37.41767,
  //         longitude: -122.079595,
  //       },
  //     },
  //   },
  //   travelMode: 'WALK',
  // routingPreference: 'TRAFFIC_UNAWARE',
  // departureTime: '2024-10-15T15:01:23.045123456Z',
  // computeAlternativeRoutes: false,
  // routeModifiers: {
  //   avoidTolls: false,
  //   avoidHighways: false,
  //   avoidFerries: false,
  // },
  //   languageCode: 'fr',
  //   units: 'METRIC',
  // };

  // const headers = {
  //   'Content-Type': 'application/json',
  //   'X-Goog-Api-Key': apikey,
  //   'X-Goog-FieldMask': 'routes.legs.steps',
  // };

  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching route:', error);
    throw error;
  }
};

essai()
  .then((data) => console.log('La réponse:', data))
  .catch((error) => console.error('Erreur:', error));
