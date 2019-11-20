import utilities from '../../helpers/utilities';
import './makeIngredientCard.scss';

const makeIngredientCard = (ingredient) => {
  const costFormatted = utilities.currencyFormatter.format(ingredient.cost / 100);
  const domString = `
  <div class="card ingredient-card col-3 pt-0 pr-1 pl-1" id="${ingredient.id}-card">
    <div class="card-body text-center pt-2 pb-2">
      <h3 class="card-title text-left ingredient-titles">${ingredient.name}</h3>
      <p class="text-left">Cost: ${costFormatted}</p>
      <p class="text-left">Amount Stocked: ${ingredient.amountStocked} ${ingredient.unitOfMeasurement}</p>
      <div class="card-footer ingredientCardFooter">
      <button class="btn btn-secondary cudButton delete-ingredient-button" id="delete-ingredient-${ingredient.id}"><i class="fa fa-trash" aria-hidden="true"></i></button>
      <button class="btn btn-secondary cudButton update-ingredient-button" data-toggle="modal" data-target="#addIngredientModal" id="update-ingredient-${ingredient.id}">
        <i class="fas fa-pencil-alt"></i>
      </button>
      </div>
    </div>
  </div>
  `;
  return domString;
};

export default { makeIngredientCard };
