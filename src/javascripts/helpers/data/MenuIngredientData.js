import axios from 'axios';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;

const deleteMenuIngredients = (menuIngredientId) => axios.delete(`${baseUrl}/menuItemIngredients/${menuIngredientId}.json`);

const getAllMenuIngredients = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/menuItemIngredients.json`)
    .then((response) => {
      const menuIngredients = response.data;
      if (menuIngredients) {
        const menuIngredientsArr = [];
        Object.keys(menuIngredients).forEach((fbId) => {
          menuIngredients[fbId].id = fbId;
          menuIngredientsArr.push(menuIngredients[fbId]);
        });
        resolve(menuIngredientsArr);
      }
    }).catch((err) => reject(err));
});

export default { getAllMenuIngredients, deleteMenuIngredients };
