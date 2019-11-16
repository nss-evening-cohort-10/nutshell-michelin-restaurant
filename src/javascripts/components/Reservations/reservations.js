import $ from 'jquery';
import reservationsData from '../../helpers/data/reservationsData';
import utilities from '../../helpers/utilities';

const addReservationByClick = () => {

};

const deleteReservationByClick = (event) => {
  const deleteReservation = $(event.target).hasClass('delete-reservation');
  const reservationId = $(event.target).closest('.card')[0].id;
  console.error(deleteReservation, reservationId);
  if (deleteReservation) {
    reservationsData.deleteReservation(reservationId)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        printReservations();
      })
      .catch((error) => console.error(error));
  }
};

const printReservations = () => {
  reservationsData.getReservations()
    .then((reservations) => {
      let domString = '';
      domString += `
      <div class="d-flex flex-wrap justify-content-between m-2 whiteh1">
        <h1>Reservations</h1>
        <button class="btn btn-light cudButton" id="add-new-reservation">Add Reservation</button>
      </div>
      `;
      domString += '<div id="reservations-section" class="d-flex flex-wrap">';
      reservations.forEach((reservation) => {
        domString += `
        <div class="card col-10 offset-1 px-0" id="${reservation.id}">
          <div class="card-header">
            <h2>${reservation.customerName}</h2>
          </div>
          <div class="card-body">
            <div class="d-flex flex-wrap justify-content-between">
              <p class="card-title">Party Size: ${reservation.partySize}</p>
              <p class="card-text">Table Number: ${reservation.seatingId.split('table-').join('')}</p>
              <p class="card-text">${reservation.timeStamp}</p>
            </div>
            <a href="#" class="btn btn-light cudButton delete-reservation">Delete</a>
            <a href="#" class="btn btn-light cudButton" id="edit-reservation">Edit</a>
          </div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('printComponent', domString);
      $('#printComponent').on('click', '.delete-reservation', deleteReservationByClick);
      $('#add-new-reservation').click(addReservationByClick);
    })
    .catch((error) => console.error(error));
};

export default { printReservations };
