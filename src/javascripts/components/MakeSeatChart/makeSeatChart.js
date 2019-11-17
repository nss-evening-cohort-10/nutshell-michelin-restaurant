
const makeSeatChart = (table) => {
  const domString = `
  <h2>${table.id}</h2>
  <h4>${table.numOfSeats}</h4>
  `;
  return domString;
};

export default { makeSeatChart };
