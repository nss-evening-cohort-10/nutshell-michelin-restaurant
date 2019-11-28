import $ from 'jquery';
import moment from 'moment';
import './reservations.scss';
import reservationsData from '../../helpers/data/reservationsData';
import utilities from '../../helpers/utilities';
import smashData from '../../helpers/data/smash';

import bgimage from './assets/reservation.jpg';
import menuData from '../../helpers/data/menuData';

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

const printReservationMenuModal = () => {
  menuData.getAllMenuItems()
    .then((menuItems) => {
      let domString = '';
      menuItems.forEach((menuItem) => {
        domString += `<div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="checkbox" id="quantity-${menuItem}" aria-label="${menuItem}-quantity">
            <div class="input-group-text">${menuItem.name}</div>
          </div>
        </div>
        <input type="number" class="form-control" aria-label="${menuItem}-quantity" placeholder="1"></div>`;
      });
      utilities.printToDom('assign-menu-items-area', domString);
    })
    .catch((error) => console.error(error));
};

const printReservationDetails = (reservationId) => {
  $('#printComponent').addClass('hide');
  $('#reservation-detail').removeClass('hide');
  $('.card-back').removeClass('hide');
  $('.reservation-card-front').addClass('hide');
  reservationsData.getReservationById(reservationId)
    .then((reservation) => {
      const time = `${reservation.timeStamp}`;
      const timeFormatted = moment(time).format('LLL');
      let domString = `<div class="card reservation-single-card">
      <div class="card-body reservation card-back" id="reservationback-${reservation.id}">
        <div class="card-header d-flex justify-content-between">
          <h3 id="customer-${reservation.id}">${reservation.customerName}</h3>
          <button class="go-back-button btn"><i class="fas fa-chevron-circle-left"></i></button>
        </div>
        <div class="d-flex flex-column align-items-end align-bottom reservationFont">
          <p class="card-title">Party Size — ${reservation.partySize}</p>
          <p class="card-text">Table Number — TBD</p>
          <p class="card-text">${timeFormatted}</p>
        </div>
        <div class="menu-items d-flex justify-content-center flex-column">`;
      smashData.getReservationsAndMenuItems(reservationId)
        .then((menuItems) => {
          menuItems.forEach((menuItem) => {
            domString += '<div class="d-flex menu-items border">';
            domString += `<div class="d-flex flex-row flex-wrap justify-content-between border">
            <div class="col-xs-6 justify-content-center border"><h4>${menuItem.name}</h4></div>
            <div class="col-xs-6 justify-content-center border"><h6>$${menuItem.price / 100}</h6></div>
            </div>`;
            domString += '</div>';
          });
          domString += '<button class="btn btn-outline-dark assign-menu" data-toggle="modal" data-target="#assign-menu-modal"><i class="fas fa-utensils"></i> Menu Items</button>';
          domString += '</div></div></div>';
          utilities.printToDom('reservation-detail', domString);
          $('.card-body').on('click', '.go-back-button', (() => {
            $('#reservation-detail').addClass('hide');
            $('.card-back').addClass('hide');
            $('#printComponent').removeClass('hide');
            // eslint-disable-next-line no-use-before-define
            printReservations();
          }));
          $('.card-body').on('click', '.assign-menu', printReservationMenuModal);
        });
    })
    .catch((error) => console.error(error));
};

const printReservationDetailsClick = (e) => {
  const incoming = e.target.id;
  if (incoming.includes('customer')) {
    const reservationId = e.target.id.split('customer-')[1];
    printReservationDetails(reservationId);
  } else {
    const reservationId = e.target.id;
    printReservationDetails(reservationId);
  }
};

const printReservations = () => {
  reservationsData.getReservations()
    .then((reservations) => {
      let domString = '';
      domString += `
      <div id="reservations-title class="d-flex justify-content-between" style="background-image: url(${bgimage})">
        <h1 id="reservations-h1">Reservations</h1>
        <button class="btn btn-secondary cudButton" id="addReservation" data-toggle="modal" data-target="#addReservationModal">Add Reservation</button>
      </div>
      `;
      domString += '<div id="reservations-section" class="d-flex flex-row flex-wrap justify-content-center">';
      reservations.forEach((reservation) => {
        const time = `${reservation.timeStamp}`;
        const timeFormatted = moment(time).format('LLL');
        domString += `
        <div class="card reservation-single-card" id="${reservation.id}">
          <div class="reservation-card-front">
            <div class="card-header">
              <h3 id="customer-${reservation.id}">${reservation.customerName}</h3>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn cudButton delete-reservation"><i class="fas fa-trash-alt"></i></button>
              <a href="#" class="cudButton btn edit-reservation"><i class="fas fa-pencil-alt"></i></a>
            </div>
          </div>
          <div class="card-body reservation card-back">
            <div class="d-flex flex-wrap flex-col align-items-end reservationFont">
              <p class="card-title">Party Size — ${reservation.partySize}</p>
              <p class="card-text">Table Number — ${reservation.seatingId.split('table-').join('')}</p>
              <p class="card-text">${timeFormatted}</p>
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
      $('#reservations-section').on('click', '.reservation-single-card', printReservationDetailsClick);
      $('#printComponent').removeClass('hide');
      $('#reservation-detail').addClass('hide');
      $('.card-back').addClass('hide');
    })
    .catch((error) => console.error(error));
};

export default { printReservations };
