import 'bootstrap';
import '../styles/main.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import menu from './components/menu/menu';
import navbar from './components/NavBar/navbar';
import reservations from './components/Reservations/reservations';
import printHome from './components/Home/home';
import seating from './components/Seating/seating';
import employeeDisplay from './components/Employees/employees';
import inventory from './components/Inventory/inventory';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  $('body').on('click', '.activateLogin', auth.signMeIn);
  authData.checkLoginStatus();
  menu.printMenuCards();
  navbar.logoutEvent();
  printHome.printHome();
  $('body').on('click', '.activateHome', printHome.printHome);
  $('body').on('click', '.activateReservations', reservations.printReservations);
  $('body').on('click', '.activateSeatingChart', seating.printSeatingChart);
  $('body').on('click', '.activateStaff', employeeDisplay.displayStaff);
  $('body').on('click', '.activateInventory', inventory.printIngredients);
};

init();
