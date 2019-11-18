import $ from 'jquery';
import reservationsData from '../../helpers/data/reservationsData';
import utilities from '../../helpers/utilities';

const updateReservationByClick = (event) => {
  event.stopImmediatePropagation();
  const reservationId = $(event.target).closest('.card')[0].id;
  console.error(reservationId);
};

const deleteReservationByClick = (event) => {
  const deleteReservation = $(event.target).id;
  const reservationId = $(event.target).closest('.card').id;
  if (deleteReservation === 'delete-reservation') {
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
            <a href="#" class="cudButton hide btn btn-light" id="delete-reservation">Delete</a>
            <a href="#" class="cudButton btn btn-light edit-reservation">Edit</a>
          </div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('printComponent', domString);
      $('#printComponent').on('click', '#delete-reservation', deleteReservationByClick);
      $('#printComponent').on('click', '.edit-reservation', updateReservationByClick);
    })
    .catch((error) => console.error(error));
};

export default { printReservations };
