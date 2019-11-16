import 'bootstrap';
import '../styles/main.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from './helpers/apiKeys.json';
import reservations from './components/Reservations/reservations';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  $('.activateReservations').click(reservations.printReservations);
};

init();
