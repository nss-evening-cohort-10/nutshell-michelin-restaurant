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

const updateModal = (ingredientId) => {
  $('#ingredientModalLabel').html('Update Ingredient');
  $('#addNewIngredient').addClass('hide');
  $('#updateIngredient').removeClass('hide');
  inventoryData.getInventory()
    .then((ingredients) => {
      const matchedIngredient = ingredients.find((x) => x.id === ingredientId);
      $('#ingredient-name').val(matchedIngredient.name);
      $('#amount-stocked').val(matchedIngredient.amountStocked);
      $('#unit-of-measurement').val(matchedIngredient.unitOfMeasurement);
      $('#ingredient-cost').val(matchedIngredient.cost / 100);
    })
    .catch((error) => console.error(error));
};

const returnModalToOriginalState = () => {
  $('#ingredientModalLabel').html('Add New Ingredient');
  $('#updateIngredient').addClass('hide');
  clearForm();
};

const printIngredients = () => {
  inventoryData.getInventory()
    .then((ingredients) => {
      let domString = `
      <h2>Inventory</h2>
      <button class="btn btn-secondary cudButton my-3" data-toggle="modal" data-target="#addIngredientModal">Add Ingredient</button>
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
      // eslint-disable-next-line no-use-before-define
      $('.ingredient-card').on('click', '.update-ingredient-button', updateIngredient);
    })
    .catch((error) => console.error(error));
};

const updateIngredient = (e) => {
  e.preventDefault();
  const ingredientId = e.target.id.split('update-ingredient-')[1];
  updateModal(ingredientId);
  $('#updateIngredient').on('click', () => {
    const newCost = $('#ingredient-cost').val() * 100;
    const newName = $('#ingredient-name').val();
    const newStock = $('#amount-stocked').val() * 1;
    const newUom = $('#unit-of-measurement').val();
    inventoryData.updatedIngredient(ingredientId, newCost, newName, newStock, newUom)
      .then(() => {
        $('#addIngredientModal').modal('hide');
        returnModalToOriginalState();
        printIngredients();
      })
      .catch((error) => console.error(error));
  });
};

export default { printIngredients };
