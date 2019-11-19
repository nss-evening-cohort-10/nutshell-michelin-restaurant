import './menu.scss';
import utilities from '../../helpers/utilities';
import smash from '../../helpers/data/smash';

const printMenuCards = () => {
  console.log(smash.getMenuWithIngredients());
  const menuArr = [];
  let menuString = `
    <h2 class="whiteh1">Menu</h2>
    <i class="fas fa-plus cudButton hide whiteh1 cursor">Add Menu Item</i>
    <div class="container mx-auto">
    <div class="d-flex flex-wrap flex-row">
  `;
  menuArr.forEach((item) => {
    menuString += `
    <div class="card-deck card-deck-cstm">
      <div class="card col-6">
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
        <div>
        <div class="card-body">
          <div class="row d-flex">
            <p class="card-text col-11">${item.description}</p>
            <i class="fas fa-pencil-alt cudButton hide cursor col-1"></i>
          </div>
          <div class="row d-flex">
            <p class="card-text col-11">Ingredients:${item.ingredients}</p>
            <i class="fas fa-pencil-alt cudButton hide cursor col-1"></i>
          </div>
          <div class="card-text">
            <small class="text-muted d-flex justify-content-between">
              <i class="fas fa-trash-alt cudButton hide cursor deleteEmployee" id=${item.id}></i>
            </small>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  menuString += '</div></div>';
  utilities.printToDom('printComponent', menuString);
};
export default { printMenuCards };
