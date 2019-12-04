
const printIndividualMenuCard = (menu, ingredientString) => {
  const domString = `<div id="${menu.id}" class="card mb-3 individual-menu-card">
  <div class="row">
    <div class="col-md-6 img-div">
      <img src="${menu.imgUrl}" class="card-img menu-img" alt="${menu.name}">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <div class="menuDetails">
          <div class="row d-flex justify-content-between">
          <h5 class="card-title text-center whiteh1">${menu.name}</h5>
          <div class="button-div">
          <button id="edit-${menu.id}" class="editMenuItemBtn cudButton hide btn btn-secondary-outline col-1"><i class="fas fa-pencil-alt"></i></button>
          <button class="cudButton hide btn btn-secondary-outline col-1 deleteMenuItem"><i class="fas fa-trash-alt" id=${menu.id}></i></button>
          </div>
          </div>
          <div class="row d-flex justify-content-between">
          <p class="card-title text-center p-0">${menu.category}</p>
          <p class="card-title text-center p-0">${menu.isAvailable}</p>
          <h5 class="card-title text-center p-0">$${(menu.price / 100).toFixed(2)}</h5>
          </div>
          <div class="card-body menu-body">
            <div class="row d-flex">
            <p class="card-text">${menu.description}</p>
            </div>
            <div class="row d-flex justify-content-between">
            <p class="card-text">Ingredients: ${ingredientString}</p>
            <button id="editIngredients-${menu.id}" class="editMenuIngredientsBtn cudButton hide btn btn-secondary-outline col-1"><i class="fas fa-pencil-alt"></i></button>
            </div>
            <div class="card-text">
            <small class="text-muted d-flex align-right">
            </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
  return domString;
};

export default { printIndividualMenuCard };
