import axios from 'axios';

const placeData = {
  description: 'blal',
  journey: ['bla', 'bla'],
  name: 'blublu',
  // slug: 'blal',
  user_id: 15,
};

const response = async () => {
  const response = await axios.delete(`http://165.22.25.11:4000/places/12 `);
  console.log(
    "renvoie apres l'enregistrement d'un nouveau lieu",
    response.data
  );
};

response();
