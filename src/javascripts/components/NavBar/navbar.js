import './navbar.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const cud = $('.cudButton');
const login = $('.activateLogin');
const logout = $('.activateLogout');

const logoutEvent = () => {
  logout.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        cud.addClass('hide');
        logout.addClass('hide');
        login.removeClass('hide');
      }).catch((err) => console.error('you are still logged in', err));
  });
};

export default { logoutEvent };
