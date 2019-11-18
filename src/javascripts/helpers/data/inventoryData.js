import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getInventory = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ingredients.json`)
    .then((response) => {
      const demIngredients = response.data;
      const ingredients = [];
      Object.keys(demIngredients).forEach((fbId) => {
        demIngredients[fbId].id = fbId;
        ingredients.push(demIngredients[fbId]);
      });
      resolve(ingredients);
    })
    .catch((error) => reject(error));
});

export default { getInventory };
