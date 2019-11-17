import './makeIngredientCard.scss';

const makeIngredientCard = (ingredient) => {
  const domString = `
  <div class="card ingredient-card col-3 pt-0 pr-1 pl-1" id="${ingredient.id}-card">
    <div class="card-body text-center pt-2 pb-2">
      <h3 class="card-title text-left">${ingredient.name}</h3>
      <p class="text-left">Cost: $${ingredient.cost / 100}</p>
      <p class="text-left">Amount Stocked: ${ingredient.amountStocked} ${ingredient.unitOfMeasurement}</p>
    </div>
  </div>
  `;
  return domString;
};

export default { makeIngredientCard };
