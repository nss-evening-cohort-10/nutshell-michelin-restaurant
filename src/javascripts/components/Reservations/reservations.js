import reservationsData from '../../helpers/data/reservationsData';
import utilities from '../../helpers/utilities';

const printReservations = () => {
  reservationsData.getReservations()
    .then((reservations) => {
      let domString = '';
      domString += '<div id="reservations-section" class="d-flex flex-wrap">';
      reservations.forEach((reservation) => {
        domString += `
        <div class="card col-10 offset-1 px-0">
          <div class="card-header">
            <h2>${reservation.customerName}</h2>
          </div>
          <div class="card-body">
            <div class="d-flex flex-wrap justify-content-between">
              <p class="card-title">Party Size: ${reservation.partySize}</p>
              <p class="card-text">Table Number: ${reservation.seatingId.split('table-').join('')}</p>
              <p class="card-text">${reservation.timeStamp}</p>
            </div>
            <a href="#" class="btn btn-light" id="delete-reservation">Delete</a>
            <a href="#" class="btn btn-light" id="edit-reservation">Edit</a>
          </div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('reservations', domString);
    })
    .catch((error) => console.error(error));
};

export default { printReservations };
