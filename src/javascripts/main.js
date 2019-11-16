import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from './helpers/apiKeys.json';
import utilities from './helpers/utilities';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  utilities.printToDom('loggedInDiv', '<button class="btn btn-light">test button</button>');
};

init();
