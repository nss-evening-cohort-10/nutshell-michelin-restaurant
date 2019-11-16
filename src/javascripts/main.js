import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import apiKeys from './helpers/apiKeys.json';
import reservations from './components/Reservations/reservations';
import printHome from './components/Home/home';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  reservations.printReservations();
  printHome.printHome();
  $('body').on('click', '.activateHome', printHome.printHome());
};

init();
