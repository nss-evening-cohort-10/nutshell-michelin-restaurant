import $ from 'jquery';
import moment from 'moment';
import './reservations.scss';
import reservationsData from '../../helpers/data/reservationsData';
import utilities from '../../helpers/utilities';

const updateReservationByClick = (event) => {
  event.preventDefault();
  const reservationId = $(event.target).attr('store-reservationId');
  const seatingId = $('#edit-seating-id').val();
  let seatingIdFormatted = 'table-';
  seatingIdFormatted += seatingId.toString();
  const partySize = $('#edit-party-size').val();
  const partySizeFormatted = parseInt(partySize, 10);
  const date = $('#edit-reserve-date').val().toString();
  const time = $('#edit-reserve-time').val().toString();
  const dateAndTime = [date, time].join(' ');
  const updatedReservation = {
    seatingId: seatingIdFormatted,
    partySize: partySizeFormatted,
    customerName: $('#edit-customer-name').val(),
    timeStamp: dateAndTime,
  };
  reservationsData.updateReservation(reservationId, updatedReservation)
    .then(() => {
      document.forms['update-reservation-form'].reset();
      $('#editReservationModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printReservations();
    })
    .catch((error) => console.error(error));
};

const updateResModal = (event) => {
  $('#editReservationModal').modal('show');
  const reservationId = $(event.target).closest('.card')[0].id;
  $('#update-reservation').attr('store-reservationId', reservationId);
  reservationsData.getReservationById(reservationId)
    .then((reservation) => {
      let domString = '';
      domString += `
    <div class="form-group">
      <label for="edit-seating-id">Table Number</label>
      <input type="text" class="form-control" id="edit-seating-id" placeholder="Table Number Here">
    </div>
    <div class="form-group">
      <label for="edit-customer-name">Customer Name</label>
      <input type="text" class="form-control" id="edit-customer-name" placeholder="Enter Customer Name">
    </div>
    <div class="form-group">
      <label for="edit-party-size">Party Size</label>
      <input type="text" class="form-control" id="edit-party-size" placeholder="Enter Party Size">
    </div>
    <div class="form-group">
      <label for="edit-reserve-date">Date</label>
      <input type="date" class="form-control" id="edit-reserve-date" placeholder="Choose Date">
    </div>
    <div class="form-group">
      <label for="edit-reserve-time">Time</label>
      <input type="time" class="form-control" id="edit-reserve-time" placeholder="Choose Time">
    </div>
      `;
      utilities.printToDom('update-reservation-form', domString);
      $('#edit-seating-id').val(reservation.seatingId.split('table-').join(''));
      $('#edit-customer-name').val(reservation.customerName);
      $('#edit-party-size').val(reservation.partySize);
      $('#edit-reserve-date').val(reservation.timeStamp.split(' ')[0]);
      $('#edit-reserve-time').val(reservation.timeStamp.split(' ')[1]);
    })
    .catch((error) => console.error(error));
};

// Should time be formatted on the page for the viewer or also in the database?
const addReservationByClick = (event) => {
  event.stopImmediatePropagation();
  const seatingId = $('#seating-id').val();
  let seatingIdFormatted = 'table-';
  seatingIdFormatted += seatingId.toString();
  const partySize = $('#party-size').val();
  const partySizeFormatted = parseInt(partySize, 10);
  const date = $('#reserve-date').val().toString();
  const time = $('#reserve-time').val().toString();
  const dateAndTime = [date, time].join(' ');
  // const dateAndTimeFormatted = moment(dateAndTime).format('LLL');
  const newReservation = {
    seatingId: seatingIdFormatted,
    partySize: partySizeFormatted,
    customerName: $('#customer-name').val(),
    timeStamp: dateAndTime,
  };
  reservationsData.addReservation(newReservation)
    .then(() => {
      document.forms['reservation-form'].reset();
      $('#addReservationModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printReservations();
    })
    .catch();
};

const deleteReservationByClick = (event) => {
  const deleteReservation = $(event.target).hasClass('delete-reservation');
  const reservationId = $(event.target).closest('.card')[0].id;
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
        <button class="btn btn-secondary cudButton" id="addReservation" data-toggle="modal" data-target="#addReservationModal">Add Reservation</button>
      </div>
      `;
      domString += '<div id="reservations-section" class="d-flex flex-wrap">';
      reservations.forEach((reservation) => {
        const time = `${reservation.timeStamp}`;
        const timeFormatted = moment(time).format('LLL');
        domString += `
        <div class="card col-10 offset-1 px-0 my-2" id="${reservation.id}">
          <div class="card-header reservation-header">
            <h2>${reservation.customerName}</h2>
          </div>
          <div class="card-body">
            <div class="d-flex flex-wrap justify-content-between">
              <p class="card-title">Party Size: ${reservation.partySize}</p>
              <p class="card-text">Table Number: ${reservation.seatingId.split('table-').join('')}</p>
              <p class="card-text">${timeFormatted}</p>
            </div>
            <div class="d-flex justify-content-end">
            <button class="btn btn-dark cudButton delete-reservation"><i class="fas fa-trash-alt"></i></button>
            <a href="#" class="cudButton btn btn-dark edit-reservation"><i class="fas fa-pencil-alt"></i></a>
            </div>
          </div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('printComponent', domString);
      $('#printComponent').on('click', '.delete-reservation', deleteReservationByClick);
      $('.edit-reservation').click(updateResModal);
      $('#add-new-reservation').click(addReservationByClick);
      $('#update-reservation').click(updateReservationByClick);
    })
    .catch((error) => console.error(error));
};

export default { printReservations };
