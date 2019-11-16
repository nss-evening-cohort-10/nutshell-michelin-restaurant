import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const cud = $('.cudButton');
const login = $('#loginBtnDiv');
const logout = $('#logoutBtn');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      cud.removeClass('hide');
      logout.removeClass('hide');
      login.addClass('hide');
    } else {
      cud.addClass('hide');
      logout.addClass('hide');
      login.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
