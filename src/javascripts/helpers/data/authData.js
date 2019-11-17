import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('.cudButton').removeClass('hide');
      $('.activateLogout').removeClass('hide');
      $('.activateLogin').addClass('hide');
    } else {
      $('.cudButton').addClass('hide');
      $('.activateLogout').addClass('hide');
      $('.activateLogin').removeClass('hide');
    }
  });
};

const checkForUser = () => {
  if (firebase.auth().currentUser) {
    $('.cudButton').removeClass('hide');
    $('.activateLogout').removeClass('hide');
    $('.activateLogin').addClass('hide');
  } else {
    $('.cudButton').addClass('hide');
    $('.activateLogout').addClass('hide');
    $('.activateLogin').removeClass('hide');
  }
};

export default { checkLoginStatus, checkForUser };
