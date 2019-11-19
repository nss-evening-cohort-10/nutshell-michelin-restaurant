import axios from 'axios';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;

const getAllMenuIngredients = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/menuItemIngredients.json`)
    .then((response) => {
      const menuIngredients = response.data;
      const menuIngredientsArr = [];
      Object.keys(menuIngredients).forEach((fbId) => {
        menuIngredients[fbId].id = fbId;
        menuIngredientsArr.push(menuIngredients[fbId]);
      });
      console.log('getAllMenuIngredients', menuIngredientsArr);
      resolve(menuIngredientsArr);
    }).catch((err) => reject(err));
});

export default { getAllMenuIngredients };
