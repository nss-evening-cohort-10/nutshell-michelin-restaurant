import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import navbar from './components/NavBar/navbar';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  auth.printLoginBtn();
  authData.checkLoginStatus();
  navbar.logoutEvent();
};

init();
