import seatingData from '../../helpers/data/seatingData';
import makeSeatChart from '../MakeSeatChart/makeSeatChart';
import utilities from '../../helpers/utilities';

import './seating.scss';

const printSeatingChart = () => {
  seatingData.getSeating()
    .then((tables) => {
      let domString = `
      <h2 class="text-white">Seating Chart</h2>
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
