import './menu.scss';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import smash from '../../helpers/data/smash';
import menuData from '../../helpers/data/menuData';
import menuIngredientsData from '../../helpers/data/MenuIngredientData';
import inventoryData from '../../helpers/data/inventoryData';

const findMenuIngredients = () => {
  const newMenuId = $('.selectIngredientList').attr('id').split('for-')[1];
  const checked = $('.ingredientCheckboxes input:checked');
  for (let i = 0; i < checked.length; i += 1) {
    const selectedIngredients = {};
    selectedIngredients.menuItemId = newMenuId;
    selectedIngredients.ingredientId = $(checked[i]).attr('id');
    menuIngredientsData.addMenuIngredient(selectedIngredients)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        printMenuCards();
        $('#newMenuIngredientsModal').modal('hide');
      }).catch((err) => console.error(err));
  }
};

const printIngredientsForm = (menuId) => {
  $('#newMenuIngredientsModal').modal('show');
  inventoryData.getInventory()
    .then((ingredients) => {
      let ingredientString = `<div id="for-${menuId}" class="selectIngredientList row d-flex flex-wrap p-2">`;
      ingredients.forEach((ingredient) => {
        ingredientString += `
          <div class="ingredientCheckboxes custom-control custom-switch col-4">
            <input type="checkbox" class="custom-control-input ingredientsListItem" id="checkbox-${ingredient.id}">
            <label class="custom-control-label" for="checkbox-${ingredient.id}">${ingredient.name}</label>
          </div>
        `;
      });
      ingredientString += '</div>';
      utilities.printToDom('addMenuIngredientsForm', ingredientString);
      $('#newMenuIngredientBtn').click(findMenuIngredients);
    }).catch((err) => console.error(err));
};

const createMenuItem = () => {
  const newMenuItem = {
    name: $('#menu-name').val(),
    price: $('#menu-price').val(),
    description: $('#menu-description').val(),
    imgUrl: $('#menu-imgUrl').val(),
    category: $('#categoryDropdown').val(),
  };
  menuData.addMenuItem(newMenuItem)
    .then((newMenuId) => {
      printIngredientsForm(newMenuId);
      $('#newMenuModal').modal('hide');
      $('#addMenuForm').trigger('reset');
      // eslint-disable-next-line no-use-before-define
      printMenuCards();
    }).catch((err) => console.error(err));
};

const removeMenuIngredients = (menuId) => {
  menuIngredientsData.getAllMenuIngredients()
    .then((ingredients) => {
      const menuIngredientsToDelete = ingredients.filter((x) => x.menuItemId === menuId);
      menuIngredientsToDelete.forEach((menuIngredient) => {
        menuIngredientsData.deleteMenuIngredients(menuIngredient.id);
      });
    })
    .catch((err) => console.error(err));
};

const removeFromMenu = (e) => {
  const menuToDelete = $(e.target).closest('.card').attr('id');
  menuData.deleteMenuItem(menuToDelete).then(() => {
    removeMenuIngredients(menuToDelete);
    // eslint-disable-next-line no-use-before-define
    printMenuCards();
  }).catch((err) => console.error(err));
};

const saveMenuChange = () => {
  const menuToUpdate = $('.menuIdPlaceholder').attr('id');
  const updatedMenuItem = {
    name: $('#menu-name').val(),
    price: $('#menu-price').val(),
    description: $('#menu-description').val(),
    imgUrl: $('#menu-imgUrl').val(),
    category: $('#categoryDropdown').val(),
  };
  menuData.updateMenuItem(menuToUpdate, updatedMenuItem)
    .then(() => {
      $('#newMenuBtn').removeClass('hide');
      $('#saveMenuUpdate').addClass('hide');
      $('#newMenuModal').modal('hide');
      $('#addMenuForm').trigger('reset');
      // eslint-disable-next-line no-use-before-define
      printMenuCards();
    }).catch((err) => console.error(err));
};

const changeMenuItem = (e) => {
  const selectedMenuId = $(e.target).attr('id').split('edit-')[1];
  menuData.getMenuItemById(selectedMenuId)
    .then((menuObj) => {
      $('.menuIdPlaceholder').attr('id', selectedMenuId);
      $('#newMenuModal').modal('show');
      $('#newMenuBtn').addClass('hide');
      $('#saveMenuUpdate').removeClass('hide');
      $('#menu-name').val(menuObj.name);
      $('#menu-description').val(menuObj.description);
      $('#menu-price').val(menuObj.price);
      $('#menu-imgUrl').val(menuObj.imgUrl);
      $(`select#categoryDropdown option[value='${menuObj.category}']`).prop('selected', true);
      $('#saveMenuUpdate').click(saveMenuChange);
    }).catch((err) => console.error(err));
};

const deleteItemsFromRecipe = (chosenIngredients, menuId) => {
  const newIngredients = chosenIngredients;
  menuIngredientsData.checkRecipesForMenuItems(menuId)
    .then((allMenuIngredients) => {
      const currentIngredients = allMenuIngredients;
      const ingredientsToDelete = currentIngredients.filter((x) => !newIngredients.includes(x.ingredientId));
      ingredientsToDelete.forEach((removal) => {
        menuIngredientsData.deleteMenuIngredients(removal.id);
      });
    }).catch((error) => console.error(error));
};

const updateIngredients = () => new Promise((resolve, reject) => {
  const chosenIngredients = $('.ingredientCheckboxes input:checked');
  const menuIngredientId = $('.selectIngredientList').attr('id').split('for-')[1];
  const newIngredients = [];
  for (let i = 0; i < chosenIngredients.length; i += 1) {
    newIngredients.push($(chosenIngredients[i]).attr('id').split('checkbox-')[1]);
  }
  deleteItemsFromRecipe(newIngredients, menuIngredientId);
  const oldIngredients = [];
  menuIngredientsData.checkRecipesForMenuItems(menuIngredientId)
    .then((allMenuIngredients) => {
      allMenuIngredients.forEach((ingredient) => {
        oldIngredients.push(ingredient.ingredientId);
        const toAdd = newIngredients.filter((x) => !oldIngredients.includes(x));
        menuIngredientsData.getAllMenuIngredients()
          .then((response) => {
            toAdd.forEach((addition) => {
              const menuIngredientIdsToAdd = response.find((y) => y.ingredientId === addition);
              console.log(menuIngredientIdsToAdd);
              // const ingredientToPrint = response.find((z) => z.id === menuIngredientIdsToAdd.id);
              // console.log(ingredientToPrint);
              if (menuIngredientIdsToAdd) {
                const addedIngredient = {};
                addedIngredient.menuItemId = menuIngredientId;
                addedIngredient.ingredientId = menuIngredientIdsToAdd.ingredientId;
                menuIngredientsData.addMenuIngredient(addedIngredient);
              }
            });
          });
      });
    }).catch((err) => reject(err));
});

const saveMenuIngredientChanges = () => {
  updateIngredients()
    .then(() => {
      $('#newMenuIngredientBtn').removeClass('hide');
      $('#updateMenuIngredientBtn').addClass('hide');
      $('#newMenuIngredientsModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printMenuCards();
    }).catch((err) => console.error(err));
};

const changeMenuIngredients = (e) => {
  const selectedMenuIngredientId = $(e.target).attr('id').split('editIngredients-')[1];
  printIngredientsForm(selectedMenuIngredientId);
  $('#newMenuIngredientBtn').addClass('hide');
  $('#updateMenuIngredientBtn').removeClass('hide');
  menuIngredientsData.checkRecipesForMenuItems(selectedMenuIngredientId)
    .then((recipeIngredients) => {
      recipeIngredients.forEach((ingredient) => {
        $(`#checkbox-${ingredient.ingredientId}`).attr('checked', true);
      });
      $('#updateMenuIngredientBtn').click((event) => {
        saveMenuIngredientChanges(event, selectedMenuIngredientId, recipeIngredients);
      });
    }).catch((err) => console.error(err));
};

const searchMenuByIngredients = (e) => {
  const userSearchInput = e.target.value.toLowerCase();
  smash.getMenuWithIngredients()
    .then((menuDetails) => {
      const searchMenuDetails = [];
      menuDetails.forEach((menuObj) => {
        const newMenuObj = { ...menuObj };
        const ingredients = menuObj.ingredientName.join(' ');
        newMenuObj.ing = ingredients;
        searchMenuDetails.push(newMenuObj);
      });
      const filteredMenu = searchMenuDetails.filter((x) => x.ing.toLowerCase().includes(userSearchInput));
      // eslint-disable-next-line no-use-before-define
      utilities.printToDom('menuCardDiv', cardBuilder(filteredMenu));
    })
    .catch((error) => console.error(error));
};

const cardBuilder = (menuArr) => {
  let menuString = '';
  menuArr.forEach((item) => {
    const ingredientString = item.ingredientName.join(', ');
    menuString += `
      <div id="${item.id}" class="card col-6 bg-secondary">
        <div class="row d-flex">
          <div class="imgDiv col-5">
            <img class="card-img" src="${item.imgUrl}" alt="picture of ${item.name}" />
          </div>
          <div class="menuDetails col-7">
            <div class="row d-flex">
              <h2 class="card-title text-center col-6 p-0 whiteh1">${item.name}</h2>
              <h5 class="card-title text-center col-5 offset-1 p-0">$${(item.price / 100).toFixed(2)}</h5>
            </div>
            <div class="row d-flex">
              <p class="card-title text-center col-6 p-0">${item.category}</p>
              <p class="card-title text-center col-5 offset-1 p-0">${item.isAvailable}</p>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row d-flex">
            <p class="card-text col-11">${item.description}</p>
            <button id="edit-${item.id}" class="editMenuItemBtn cudButton hide btn btn-secondary col-1"><i class="fas fa-pencil-alt"></i></button>
          </div>
          <div class="row d-flex">
            <p class="card-text col-11">Ingredients: ${ingredientString}</p>
            <button id="editIngredients-${item.id}" class="editMenuIngredientsBtn cudButton hide btn btn-secondary col-1"><i class="fas fa-pencil-alt"></i></button>
          </div>
          <div class="card-text">
            <small class="text-muted d-flex align-right">
            <button class="cudButton hide btn btn-secondary col-1 deleteMenuItem"><i class="fas fa-trash-alt" id=${item.id}></i></button>
            </small>
          </div>
        </div>
      </div>
    `;
  });
  return menuString;
};

const printMenuCards = () => {
  smash.getMenuWithIngredients().then((menuArr) => {
    let menuString = `
    <div class="d-flex flex-wrap justify-content-between m-2">
      <h2 class="whiteh1 m-1">Menu</h2>
      <input id="menuSearchInput" class="form-control col-3 editHeight" type="search" placeholder="Search Menu By Ingredient" aria-label="Search">
      <button id="createMenuItemBtn" class="cudButton hide btn btn-secondary editHeight" data-toggle="modal" data-target="#newMenuModal"><i class="fas fa-plus">Add Menu Item</i></button>
    </div>
      <div class="container mx-auto">
        <div id="menuCardDiv" class="d-flex flex-wrap flex-row">
    `;
    menuString += cardBuilder(menuArr);
    menuString += '</div></div>';
    utilities.printToDom('printComponent', menuString);
    $('body').on('click', '#newMenuBtn', createMenuItem);
    $('body').on('click', '.deleteMenuItem', removeFromMenu);
    $('body').on('click', '.editMenuItemBtn', changeMenuItem);
    $('body').on('click', '.editMenuIngredientsBtn', changeMenuIngredients);
    $('#menuSearchInput').on('keyup', searchMenuByIngredients);
  }).catch((err) => console.error(err));
};

export default { printMenuCards };
