import inventoryData from '../../helpers/data/inventoryData';
import utilities from '../../helpers/utilities';

import './inventory.scss';

const printIngredients = () => {
  inventoryData.getInventory()
    .then((ingredients) => {
      let domString = `
      <h2>Inventory</h2>
      `;
      ingredients.forEach((ingredient) => {
        domString += `
        <p>${ingredient.name}</p>
        `;
      });
      utilities.printToDom('printComponent', domString);
    })
    .catch((error) => console.error(error));
};

const init = () => {
  printIngredients();
};

export default { init };
