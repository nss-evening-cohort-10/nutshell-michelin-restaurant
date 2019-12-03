import './makeSeatChart.scss';

const makeSeatChart = (table) => {
  const tableNumber = table.tableName;
  const domString = `
  <div class="card seat-${table.numOfSeats}-card seating-card">
  <h2>${tableNumber}</h2>
  <h4>Seats: ${table.numOfSeats}</h4>
  </div>
  `;
  return domString;
};

export default { makeSeatChart };
