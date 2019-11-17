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
      <h2>Seating Chart</h2>
      <div class="row seat-row">
      <div class="d-flex flex-column flex-wrap seat-container">
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
