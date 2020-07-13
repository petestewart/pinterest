import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';

const logoutEvent = () => {
  $('#navbar-logout-button').click((e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
};

export default { logoutEvent };
