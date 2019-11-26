import axios from 'axios';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;

const deleteMenuIngredients = (menuIngredientId) => axios.delete(`${baseUrl}/menuItemIngredients/${menuIngredientId}.json`);

const addMenuIngredient = (newMenuIngredient) => axios.post(`${baseUrl}/menuItemIngredients.json`, newMenuIngredient);

const getAllMenuIngredients = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/menuItemIngredients.json`)
    .then((response) => {
      const menuIngredients = response.data;
      const menuIngredientsArr = [];
      Object.keys(menuIngredients).forEach((fbId) => {
        menuIngredients[fbId].id = fbId;
        menuIngredientsArr.push(menuIngredients[fbId]);
      });
      resolve(menuIngredientsArr);
    }).catch((err) => reject(err));
});

const checkRecipesForIngredients = (ingredientId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/menuItemIngredients.json?orderBy="ingredientId"&equalTo="${ingredientId}"`)
    .then((response) => {
      const recipesWithIngredient = response.data;
      const recipeIngredientList = [];
      Object.keys(recipesWithIngredient).forEach((fbId) => {
        recipesWithIngredient[fbId].id = fbId;
        recipeIngredientList.push(recipesWithIngredient[fbId]);
      });
      resolve(recipeIngredientList);
    })
    .catch((error) => reject(error));
});

export default {
  getAllMenuIngredients,
  deleteMenuIngredients,
  addMenuIngredient,
  checkRecipesForIngredients,
};
