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

const returnModalToOriginalState = () => {
  $('#ingredientModalLabel').html('Add New Ingredient');
  $('#updateIngredient').addClass('hide');
  $('#addNewIngredient').removeClass('hide');
  clearForm();
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

const updateIngredient = (event) => {
  event.stopImmediatePropagation();
  const ingredientId = $('.hacker-space').attr('id');
  const updatedIngredient = {
    name: $('#ingredient-name').val(),
    amountStocked: $('#amount-stocked').val() * 1,
    unitOfMeasurement: $('#unit-of-measurement').val(),
    cost: $('#ingredient-cost').val() * 100,
  };
  inventoryData.updateIngredient(ingredientId, updatedIngredient)
    .then(() => {
      $('#addIngredientModal').modal('hide');
      returnModalToOriginalState();
      // eslint-disable-next-line no-use-before-define
      printIngredients();
      clearForm();
    })
    .catch((error) => console.error(error));
};

const updateModal = (e) => {
  const ingredientId = e.target.id.split('update-ingredient-')[1];
  $('#updateIngredient').click(updateIngredient);
  $('#ingredientModalLabel').html('Update Ingredient');
  $('#addNewIngredient').addClass('hide');
  $('#updateIngredient').removeClass('hide');
  $('.hacker-space').attr('id', ingredientId);
  clearForm();
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

const filteredIngredientPrinter = (filteredIngredients) => {
  let domString = '';
  filteredIngredients.forEach((ingredient) => {
    domString += makeIngredientCard.makeIngredientCard(ingredient);
  });
  utilities.printToDom('ingredient-holder', domString);
  $('.ingredient-card').on('click', '.delete-ingredient-button', deleteIngredient);
  $('.ingredient-card').on('click', '.update-ingredient-button', updateModal);
};

const searchIngredients = (e) => {
  const userSearchInput = e.target.value.toLowerCase();
  inventoryData.getInventory()
    .then((ingredients) => {
      const filteredIngredients = ingredients.filter((x) => x.name.toLowerCase().includes(userSearchInput));
      filteredIngredientPrinter(filteredIngredients);
    })
    .catch((error) => console.error(error));
};

const printIngredientHeader = () => {
  const domString = `
  <div class="d-flex flex-wrap justify-content-between m-3">
  <h1 class="whiteh1">Inventory</h1>
  <input id="ingredientSearchInput" class="form-control col-3 editHeight" type="search" placeholder="Search for ingredients" aria-label="Search">
  <button class="btn btn-secondary cudButton" data-toggle="modal" data-target="#addIngredientModal">Add Ingredient</button>
  </div>
  <div class="container mx-auto">
  <div class="d-flex flex-wrap flex-row" id="ingredient-holder">
  </div></div>
  `;
  utilities.printToDom('printComponent', domString);
  $('#addNewIngredient').on('click', createNewIngredient);
  $('#ingredientSearchInput').on('keyup', searchIngredients);
};


const printIngredients = () => {
  inventoryData.getInventory()
    .then((ingredients) => {
      let domString = '';
      ingredients.forEach((ingredient) => {
        domString += makeIngredientCard.makeIngredientCard(ingredient);
      });
      utilities.printToDom('ingredient-holder', domString);
      $('.ingredient-card').on('click', '.delete-ingredient-button', deleteIngredient);
      $('.ingredient-card').on('click', '.update-ingredient-button', updateModal);
    })
    .catch((error) => console.error(error));
};

const init = () => {
  printIngredientHeader();
  printIngredients();
};

export default { init };
