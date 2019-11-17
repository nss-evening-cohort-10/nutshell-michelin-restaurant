import inventoryData from '../../helpers/data/inventoryData';
import utilities from '../../helpers/utilities';

import './inventory.scss';
import makeIngredientCard from '../MakeIngredientCard/makeIngredientCard';

const printIngredients = () => {
  inventoryData.getInventory()
    .then((ingredients) => {
      let domString = `
      <h2>Inventory</h2>
      <div class="container mx-auto">
      <div class="d-flex flex-wrap flex-row">
      `;
      ingredients.forEach((ingredient) => {
        // const ingredientId = ingredient.id;
        // console.log(ingredientId);
        domString += makeIngredientCard.makeIngredientCard(ingredient);
      });
      domString += '</div></div>';
      utilities.printToDom('printComponent', domString);
    })
    .catch((error) => console.error(error));
};

const init = () => {
  printIngredients();
};

export default { init };
