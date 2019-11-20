import './menu.scss';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import smash from '../../helpers/data/smash';
import menuData from '../../helpers/data/menuData';
import menuIngredientsData from '../../helpers/data/MenuIngredientData';

const createMenuItem = () => {
  const newMenuItem = {
    name: $('#menu-name').val(),
    price: $('#menu-price').val(),
    description: $('#menu-description').val(),
    imgUrl: $('#menu-imgUrl').val(),
    category: $('#categoryDropdown').val(),
  };
  menuData.addMenuItem(newMenuItem)
    .then(() => {
      $('#newMenuModal').modal('hide');
      $('#addMenuForm').trigger('reset');
      // eslint-disable-next-line no-use-before-define
      printMenuCards();
    }).catch((err) => console.error(err));
};

const removeMenuIngredients = (menuId) => {
  menuIngredientsData.getAllMenuIngredients().then((ingredients) => {
    const menuIngredientsToDelete = ingredients.filter((x) => x.menuItemId === menuId);
    menuIngredientsToDelete.forEach((menuIngredient) => {
      menuIngredientsData.deleteMenuIngredients(menuIngredient.id);
    });
  }).catch((err) => console.error(err));
};

const removeFromMenu = (e) => {
  const menuToDelete = $(e.target).closest('.card').attr('id');
  menuData.deleteMenuItem(menuToDelete).then(() => {
    removeMenuIngredients(menuToDelete);
    // eslint-disable-next-line no-use-before-define
    printMenuCards();
  }).catch((err) => console.error(err));
};

const saveMenuChange = (e) => {
  e.stopImmediatePropagation();
  const menuToUpdate = $('.menuIdPlaceholder').attr('id');
  console.log('saveMenuChange', menuToUpdate);
  const updatedMenuItem = {
    name: $('#menu-name').val(),
    price: $('#menu-price').val(),
    description: $('#menu-description').val(),
    imgUrl: $('#menu-imgUrl').val(),
    category: $('#categoryDropdown').val(),
  };
  menuData.updateMenuItem(menuToUpdate, updatedMenuItem)
    .then(() => {
      $('#newMenuModal').modal('hide');
      $('#addMenuForm').trigger('reset');
      // eslint-disable-next-line no-use-before-define
      printMenuCards();
    }).catch((err) => console.error(err));
};

const changeMenuItem = (e) => {
  e.stopImmediatePropagation();
  const selectedMenuId = $(e.target).attr('id').split('edit-')[1];
  console.log('changeMenuItem', selectedMenuId);
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
      console.log(menuObj);
    }).catch((err) => console.error(err));
};

const changeMenuIngredients = () => {};

const printMenuCards = () => {
  smash.getMenuWithIngredients().then((menuArr) => {
    let menuString = `
      <h2 class="whiteh1">Menu</h2>
      <button id="createMenuItemBtn" class="cudButton hide btn btn-secondary m-1" data-toggle="modal" data-target="#newMenuModal"><i class="fas fa-plus">Add Menu Item</i></button>
      <div class="container mx-auto">
      <div class="d-flex flex-wrap flex-row">
    `;
    menuArr.forEach((item) => {
      const ingredientString = item.ingredientName.join(', ');
      menuString += `
        <div id="${item.id}" class="card col-6">
          <div class="row d-flex">
            <div class="imgDiv col-5">
              <img class="card-img" src="${item.imgUrl}" alt="picture of ${item.name}" />
            </div>
            <div class="menuDetails col-7">
              <div class="row d-flex">
                <h5 class="card-title text-center col-6 p-0">${item.name}</h5>
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
    menuString += '</div></div>';
    utilities.printToDom('printComponent', menuString);
    $('body').on('click', '#newMenuBtn', createMenuItem);
    $('body').on('click', '.deleteMenuItem', removeFromMenu);
    $('body').on('click', '.editMenuItemBtn', changeMenuItem);
    $('body').on('click', '.editMenuIngredientsBtn', changeMenuIngredients);
  }).catch((err) => console.error(err));
};

export default { printMenuCards };
