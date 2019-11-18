import $ from 'jquery';
import inventoryData from '../../helpers/data/inventoryData';
import makeIngredientCard from '../MakeIngredientCard/makeIngredientCard';
import utilities from '../../helpers/utilities';

import './inventory.scss';

const createNewIngredient = (e) => {
  e.stopImmediatePropagation();
  const newIngredient = {
    name: $('#ingredient-name').val(),
    amountStocked: $('#amount-stocked').val(),
    unitOfMeasurement: $('#unit-of-measurement').val(),
    cost: $('#ingredient-cost').val(),
  };
  inventoryData.addIngredient(newIngredient)
    .then(() => {
      $('#addIngredientModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printIngredients();
    })
    .catch((error) => console.error(error));
};

const printIngredients = () => {
  inventoryData.getInventory()
    .then((ingredients) => {
      let domString = `
      <h2>Inventory</h2>
      <button class="btn btn-secondary cudButton" data-toggle="modal" data-target="#addIngredientModal">Add Ingredient</button>
      <div class="container mx-auto">
      <div class="d-flex flex-wrap flex-row">
      `;
      ingredients.forEach((ingredient) => {
        domString += makeIngredientCard.makeIngredientCard(ingredient);
      });
      domString += '</div></div>';
      utilities.printToDom('printComponent', domString);
      $('#addNewIngredient').on('click', createNewIngredient);
    })
    .catch((error) => console.error(error));
};


export default { printIngredients };
