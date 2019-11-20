import seatingData from '../../helpers/data/seatingData';
import makeSeatChart from '../MakeSeatChart/makeSeatChart';
import utilities from '../../helpers/utilities';

import './seating.scss';

// const sortTables = (a, b) => {
//   if (a.id < b.id) {
//     return -1;
//   }
//   if (a.id > b.id) {
//     return 1;
//   }
//   return 0;
// };

const printSeatingChart = () => {
  seatingData.getSeating()
    .then((tables) => {
      let domString = `
      <h1 class="whiteh1 m-2">Seating Chart</h1>
      <div class="d-flex flex-column flex-wrap seat-container mx-auto justify-content-between">
      `;
      tables.forEach((table) => {
        domString += makeSeatChart.makeSeatChart(table);
      });
      domString += '</div></div>';
      utilities.printToDom('printComponent', domString);
    })
    .catch((error) => console.error(error));
};

export default { printSeatingChart };
