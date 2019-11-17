import seatingData from '../../helpers/data/seatingData';
import makeSeatChart from '../MakeSeatChart/makeSeatChart';
import utilities from '../../helpers/utilities';

const printSeatingChart = () => {
  seatingData.getSeating()
    .then((tables) => {
      let domString = `
      <h2>Seating Chart</h2>
      <div class="container">
      <div class="card-columns">
      `;
      tables.id.sort().forEach((table) => {
        domString += makeSeatChart.makeSeatChart(table);
      });
      domString += '</div></div>';
      utilities.printToDom('printComponent', domString);
    })
    .catch((error) => console.error(error));
};

export default { printSeatingChart };
