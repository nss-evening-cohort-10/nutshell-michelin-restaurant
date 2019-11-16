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

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  $('.activateLogin').click(auth.signMeIn);
  authData.checkLoginStatus();
  navbar.logoutEvent();
  $('.activateReservations').click(reservations.printReservations);
};

init();
