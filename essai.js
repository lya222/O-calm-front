// import axios from 'axios';

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

if ('geolocation' in navigator) {
  console.log('Geolocation is available');
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log('Latitude: ' + position.coords.latitude);
    console.log('Longitude: ' + position.coords.longitude);
  });
} else {
  console.log('Geolocation is not available');
}
