import 'bootstrap';
import '../styles/main.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from './helpers/apiKeys.json';
import reservations from './components/Reservations/reservations';
import printHome from './components/Home/home';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  printHome.printHome();
  $('body').on('click', '.activateHome', printHome.printHome);
  $('body').on('click', '.activateReservations', reservations.printReservations);
};

init();
