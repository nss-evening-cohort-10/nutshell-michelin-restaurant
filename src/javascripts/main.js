import 'bootstrap';
import $ from 'jquery';
import '../styles/main.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import navbar from './components/NavBar/navbar';
import reservations from './components/Reservations/reservations';
import printHome from './components/Home/home';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  $('body').on('click', '.activateLogin', auth.signMeIn);
  authData.checkLoginStatus();
  navbar.logoutEvent();
  printHome.printHome();
  $('body').on('click', '.activateHome', printHome.printHome);
  $('body').on('click', '.activateReservations', reservations.printReservations);
};

init();
