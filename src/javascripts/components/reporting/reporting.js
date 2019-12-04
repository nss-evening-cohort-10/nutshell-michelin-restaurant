import $ from 'jquery';
import './reporting.scss';
import utilities from '../../helpers/utilities';
import menuData from '../../helpers/data/menuData';

const printPopularityOptions = () => {
  let domString = '<option selected>Choose...</option>';
  domString += '<option value="mostPop">Most Popular</option>';
  domString += '<option value="leastPop">Least Popular</option>';
  utilities.printToDom('reportsMenu', domString);
};

const detectSelection = () => {
  $('#reportRadios').change(() => {
    const selectedOption = $('input[name="reportOptions"]:checked').val();
    if (selectedOption === 'ingredientReport') {
      console.log('ingredients print option goes here');
    } else if (selectedOption === 'salesReport') {
      console.log('sales print option goes here');
    } else if (selectedOption === 'popularityReport') {
      printPopularityOptions();
    }
  });
};


const mostPopularFoods = () => {
  let domString = '';
  let newObject = {};
  const menuItemArray = [];
  menuData.getAllMenuItems()
    .then((menuItems) => {
      menuItems.forEach((item) => {
        newObject = {
          name: `${item.name}`,
          popularity: `${item.quantitySold}`,
        };
        menuItemArray.push(newObject);
      });
      menuItemArray.sort((a, b) => b.popularity - a.popularity);
      for (let i = 0; i < 10; i += 1) {
        domString += `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${menuItemArray[i].name}</td>
          <td class="numSold">${menuItemArray[i].popularity}</td>
        </tr>`;
      }
      utilities.printToDom('popTable', domString);
    })
    .catch((error) => console.error(error));
};

const goToOption = () => {
  const reportToPrint = $('#reportsMenu').val();
  if (reportToPrint === 'mostPop') {
    let domString = '<h4 class="mt-3">Top 10 Most Popular Menu Items</h4>';
    domString += `
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Menu Item</th>
            <th scope="col" class="numSold">Quantity Sold</th>
          </tr>
        </thead>
        <tbody id="popTable">
        </tbody>
      </table>`;
    utilities.printToDom('reportContainer', domString);
    mostPopularFoods();
  } else if (reportToPrint === 'leastPop') {
    console.log('least popular');
  }
};

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
      <form id="reportRadios">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="btn btn-secondary">
        <input type="radio" name="reportOptions" id="ingredientReport" 
        value="ingredientReport" autocomplete="off" checked> Ingredients
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="reportOptions" id="salesReport" value="salesReport" autocomplete="off"> Revenue
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="reportOptions" id="popularityReport" value="popularityReport" autocomplete="off"> Popularity
      </label>
      </form>
      </div>
      </div>
    </div>
  </div>`;
  domString += `
  <form>
  <div class="row d-flex justify-content-center">
  <div class="form-row d-flex align-items-center">
    <div class="col-auto my-1">
      <label class="mr-sm-2" for="reportsMenu">Select an Option</label>
      <select class="custom-select" id="reportsMenu">
      </select>
      <button class="btn btn-dark do-the-thing">Go</button>
    </div>
    </div>
    </div>
    </form>`;
  domString += '<div id="reportContainer"></div>';
  domString += '</div></div>';
  utilities.printToDom('printComponent', domString);
  detectSelection();
  $('body').on('click', '.do-the-thing', goToOption);
};

export default { printReports };
