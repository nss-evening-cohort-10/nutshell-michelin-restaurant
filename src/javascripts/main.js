import 'bootstrap';
import '../styles/main.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from './helpers/apiKeys.json';
import reservations from './components/Reservations/reservations';
import printHome from './components/Home/home';
import inventory from './components/Inventory/inventory';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  printHome.printHome();
  $('body').on('click', '.activateHome', printHome.printHome);
  $('body').on('click', '.activateReservations', reservations.printReservations);
  $('body').on('click', '.activateInventory', inventory.printIngredients);
};

init();
