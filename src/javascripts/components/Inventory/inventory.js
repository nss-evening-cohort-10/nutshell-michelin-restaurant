import $ from 'jquery';
import inventoryData from '../../helpers/data/inventoryData';
import makeIngredientCard from '../MakeIngredientCard/makeIngredientCard';
import utilities from '../../helpers/utilities';

import './inventory.scss';

const clearForm = () => {
  $('#ingredient-name').val('');
  $('#amount-stocked').val('');
  $('#unit-of-measurement').val('');
  $('#ingredient-cost').val('');
};

const sendNewIngredientToDb = (newIngredient) => {
  inventoryData.addIngredient(newIngredient)
    .then(() => {
      $('#addIngredientModal').modal('hide');
      clearForm();
      // eslint-disable-next-line no-use-before-define
      printIngredients();
    })
    .catch((error) => console.error(error));
};

const checkCurrentInventory = (newIngredient) => {
  inventoryData.getInventory()
    .then((ingredients) => {
      const checkData = ingredients.some((ingredient) => ingredient.name === newIngredient.name);
      if (checkData === true) {
        $('#existingIngredientWarning').removeClass('hide');
      } else {
        sendNewIngredientToDb(newIngredient);
      }
    })
    .catch((error) => console.error(error));
};

const createNewIngredient = (e) => {
  e.stopImmediatePropagation();
  const newIngredient = {
    name: $('#ingredient-name').val(),
    amountStocked: $('#amount-stocked').val() * 1,
    unitOfMeasurement: $('#unit-of-measurement').val(),
    cost: $('#ingredient-cost').val() * 100,
  };
  checkCurrentInventory(newIngredient);
};

const deleteIngredient = (e) => {
  e.preventDefault();
  const ingredientId = e.target.id.split('delete-ingredient-')[1];
  inventoryData.deleteIngredient(ingredientId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printIngredients();
    })
    .catch((error) => console.error(error));
};

const printIngredients = () => {
  inventoryData.getInventory()
    .then((ingredients) => {
      let domString = `
      <div class="d-flex flex-wrap justify-content-between m-2 whiteh1">
        <h1>Inventory</h1>
        <button class="btn btn-secondary cudButton" data-toggle="modal" data-target="#addIngredientModal">Add Ingredient</button>
      </div>
      <div class="container mx-auto">
      <div class="d-flex flex-wrap flex-row">
      `;
      ingredients.forEach((ingredient) => {
        domString += makeIngredientCard.makeIngredientCard(ingredient);
      });
      domString += '</div></div>';
      utilities.printToDom('printComponent', domString);
      $('#addNewIngredient').on('click', createNewIngredient);
      $('.ingredient-card').on('click', '.delete-ingredient-button', deleteIngredient);
    })
    .catch((error) => console.error(error));
};


export default { printIngredients };
