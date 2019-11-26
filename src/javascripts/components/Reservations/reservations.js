import $ from 'jquery';
import moment from 'moment';
import './reservations.scss';
import reservationsData from '../../helpers/data/reservationsData';
import utilities from '../../helpers/utilities';
import seatingData from '../../helpers/data/seatingData';

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
  seatingData.getSeating()
    .then((seatings) => {
      const seatingRecord = seatings.find((x) => x.id === seatingId);
      if (partySizeFormatted <= seatingRecord.numOfSeats) {
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
      } else {
        $('#edit-reservation-party-size').removeClass('hide');
      }
    });
};

const tableOption = (selectId) => {
  let domString = '<option>Choose...</option>';
  seatingData.getSeating()
    .then((seatings) => {
      seatings.forEach((seating) => {
        domString += `<option value="${seating.tableName}">${seating.tableName}</option>`;
      });
      utilities.printToDom(selectId, domString);
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
    <form>
      <div class="form-row align-items-center">
        <div class="col-auto my-1">
          <label class="mr-sm-2" for="edit-seating-id">Table Numbers</label>
          <select class="custom-select mr-sm-2 newTableSelection" id="edit-seating-id">
          </select>
        </div>
      </div>  
    </form>
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
      <div>
        <small id="edit-reservation-party-size" class="form-text hide text-danger">Reservation party size exceeds number of seats at the table. Please pick a different table.</small>
      </div>
    </div>
      `;
      utilities.printToDom('update-reservation-form', domString);
      tableOption('edit-seating-id');
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
  seatingData.getSeating()
    .then((seatings) => {
      const seatingRecord = seatings.find((x) => x.id === seatingId);
      if (partySizeFormatted <= seatingRecord.numOfSeats) {
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
          });
      } else {
        $('#reservation-party-size').removeClass('hide');
      }
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
        <div class="card bg-secondary col-10 offset-1 px-0 my-2" id="${reservation.id}">
          <div class="card-header bg-dark whiteh1">
            <h2>${reservation.customerName}</h2>
          </div>
          <div class="card-body">
            <div class="d-flex flex-wrap justify-content-between reservationFont">
              <p class="card-title">Party Size — ${reservation.partySize}</p>
              <p class="card-text">Table Number — ${reservation.seatingId.split('table-').join('')}</p>
              <p class="card-text">${timeFormatted}</p>
            </div>
            <div class="d-flex justify-content-end">
            <button class="btn btn-secondary cudButton delete-reservation"><i class="fas fa-trash-alt"></i></button>
            <a href="#" class="cudButton btn btn-secondary edit-reservation"><i class="fas fa-pencil-alt"></i></a>
            </div>
          </div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('printComponent', domString);
      tableOption('seating-id');
      $('#printComponent').on('click', '.delete-reservation', deleteReservationByClick);
      $('.edit-reservation').click(updateResModal);
      $('#add-new-reservation').click(addReservationByClick);
      $('#update-reservation').click(updateReservationByClick);
    })
    .catch((error) => console.error(error));
};

export default { printReservations };
