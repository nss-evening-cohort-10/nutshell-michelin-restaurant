import './menu.scss';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import smash from '../../helpers/data/smash';
import menuData from '../../helpers/data/menuData';
import menuIngredientsData from '../../helpers/data/MenuIngredientData';
import inventoryData from '../../helpers/data/inventoryData';


const addIngredientOptions = (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  const menuId = e.target.id.split('addItem-')[1];
  // eslint-disable-next-line no-use-before-define
  printIngredientsForm(menuId);
  menuIngredientsData.checkRecipesForMenuItems(menuId)
    .then((menuItems) => {
      menuItems.forEach((item) => {
        $(`#ingredient-${item.ingredientId}`).addClass('hide');
      });
    })
    .catch((error) => console.error(error));
};

const removeIngredientOptions = (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  const menuId = e.target.id.split('removeItem-')[1];
  // eslint-disable-next-line no-use-before-define
  printDeleteIngredientsForm(menuId);
};


const printDeleteIngredientsForm = (menuId) => {
  menuIngredientsData.checkRecipesForMenuItems(menuId)
    .then((menuItems) => {
      let domString = '<div class="row-wrap">';
      menuItems.forEach((item) => {
        inventoryData.getInventoryById(item.ingredientId).then((ingredients) => {
          ingredients.forEach((ingredient) => {
            domString += `<div class="col-1" id="delCont-${item.menuItemId}"}><div id="rem-${ingredient.id}">${ingredient.name}</div><button class="btn btn-dark removeIngred" id="del-${ingredient.id}">remove</button></div>`;
          });
          domString += '</div>';
          utilities.printToDom('addMenuIngredientsForm', domString);
        });
      });
    })
    .catch((error) => console.error(error));
  // eslint-disable-next-line no-use-before-define
  $('body').on('click', '.removeIngred', deleteItemsFromRecipe);
};


const printMenuIngredientOptions = (menuId) => {
  $('#newMenuIngredientsModal').modal('show');
  const domString = `
    <button class="btn btn-dark addItem" id="addItem-${menuId}">Add an Ingredient</button>
    <button class="btn btn-dark removeItem" id="removeItem-${menuId}">Remove an Ingredient</button>`;
  utilities.printToDom('addMenuIngredientsForm', domString);
  $('#updateMenuIngredientBtn').addClass('hide');
  $('body').on('click', '.addItem', addIngredientOptions);
  $('body').on('click', '.removeItem', removeIngredientOptions);
};

const findMenuIngredients = () => {
  const newMenuId = $('.ingredientDropdown').attr('id').split('ingredientSelect-')[1];
  const ingredientToAdd = $('.ingredientDropdown').val();
  const quantityToAdd = $('#usedPerRecipe').val() * 1;
  let uom = '';

  inventoryData.getInventory()
    .then((ingredients) => {
      ingredients.forEach((ingredient) => {
        if (ingredient.id === ingredientToAdd) {
          uom = ingredient.unitOfMeasurement;
        }
      });
      const objectToAdd = {
        menuItemId: newMenuId,
        ingredientId: ingredientToAdd,
        amountUsedPerRecipe: quantityToAdd,
        unitOfMeasurement: uom,
      };
      menuIngredientsData.addMenuIngredient(objectToAdd)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          printMenuCards();
          $('#newMenuIngredientsModal').modal('hide');
        });
    }).catch((err) => console.error(err));
};

const printIngredientsForm = (menuId) => {
  let domString = `
  <form>
  <div class="form-row align-items-center">
    <div class="col-auto my-1">
      <label class="mr-sm-2" for="ingredientSelect-${menuId}">Add an Ingredient</label>
      <select class="custom-select mr-sm-2 ingredientDropdown" id="ingredientSelect-${menuId}">
      <option selected>Choose...</option>`;
  inventoryData.getInventory()
    .then((ingredients) => {
      ingredients.forEach((ingredient) => {
        domString += `
          <option value="${ingredient.id}" id="ingredient-${ingredient.id}">${ingredient.name}</option>
        `;
      });
      domString += `
              </select>
            </div>
          </div>
            <div class="form-group col-2">
              <label for="usedPerRecipe">Used Per Recipe</label>
              <input type="number" class="form-control" id="usedPerRecipe" min="1" value="1">
              <div id="uom"></div>
          </div>
        </form>`;
      utilities.printToDom('addMenuIngredientsForm', domString);
    }).catch((err) => console.error(err));
  $('#updateMenuIngredientBtn').removeClass('hide');
  $('#updateMenuIngredientBtn').click(findMenuIngredients);
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
      printMenuIngredientOptions(newMenuId);
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
        menuIngredientsData.deleteMenuIngredients(menuIngredient.id)
          // eslint-disable-next-line no-use-before-define
          .then(() => printMenuCards());
      });
    })
    .catch((err) => console.error(err));
};

const removeFromMenu = (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();
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
  e.stopImmediatePropagation();
  e.preventDefault();
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

const deleteItemsFromRecipe = (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  const newIngredients = e.target.id.split('del-')[1];
  const recipeToChange = e.target.closest('div').id.split('delCont-')[1];
  menuIngredientsData.checkRecipesForMenuItems(recipeToChange)
    .then((allMenuIngredients) => {
      allMenuIngredients.forEach((item) => {
        if (item.ingredientId === newIngredients) {
          menuIngredientsData.deleteMenuIngredients(item.id);
        }
      });
      $('#newMenuIngredientBtn').removeClass('hide');
      $('#updateMenuIngredientBtn').addClass('hide');
      $('#newMenuIngredientsModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printMenuCards();
    }).catch((error) => console.error(error));
};


const changeMenuIngredients = (e) => {
  const selectedMenuIngredientId = $(e.target).attr('id').split('editIngredients-')[1];
  printMenuIngredientOptions(selectedMenuIngredientId);
  $('#newMenuIngredientBtn').addClass('hide');
};

const searchMenuByIngredients = (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();
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
