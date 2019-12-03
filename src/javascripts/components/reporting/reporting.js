// import $ from 'jquery';
import './reporting.scss';
import utilities from '../../helpers/utilities';

const printReports = () => {
  let domString = `
  <div class="d-flex flex-wrap justify-content-between m-2">
  <h2 class="whiteh1 m-1">Reports</h2></div>
  <div class="container mx-auto">
    <div id="menuCardDiv" class="d-flex flex-wrap flex-row">
`;
  domString += `<div id="#" class="card col-12 bg-secondary">
    <div class="row d-flex">
      <div class="card-body">
      <div class="row d-flex">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="btn btn-secondary active">
        <input type="radio" name="options" id="ingredientReport" autocomplete="off" checked> Ingredients
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" id="salesReport" autocomplete="off"> Revenue
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" id="popularityReport" autocomplete="off"> Popularity
      </label>
      </div>
      </div>
      <div class="row d-flex">
      </div>
      <div class="card-text">
        <small class="text-muted d-flex align-right">
        </small>
      </div>
    </div>
  </div>`;
  domString += '</div></div>';
  utilities.printToDom('printComponent', domString);
};

export default { printReports };
