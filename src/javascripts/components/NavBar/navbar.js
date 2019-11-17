import './navbar.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const logoutEvent = () => {
  $('.activateLogout').click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        $('.cudButton').addClass('hide');
        $('.activateLogout').addClass('hide');
        $('.activateLogin').removeClass('hide');
      }).catch((err) => console.error('you are still logged in', err));
  });
};

export default { logoutEvent };
