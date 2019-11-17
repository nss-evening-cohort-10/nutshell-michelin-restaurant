import inventoryData from '../../helpers/data/inventoryData';
import makeIngredientCard from '../MakeIngredientCard/makeIngredientCard';
import utilities from '../../helpers/utilities';

import './inventory.scss';

const printIngredients = () => {
  inventoryData.getInventory()
    .then((ingredients) => {
      let domString = `
      <h2>Inventory</h2>
      <div class="container mx-auto">
      <div class="d-flex flex-wrap flex-row">
      `;
      ingredients.forEach((ingredient) => {
        domString += makeIngredientCard.makeIngredientCard(ingredient);
      });
      domString += '</div></div>';
      utilities.printToDom('printComponent', domString);
    })
    .catch((error) => console.error(error));
};


export default { printIngredients };
