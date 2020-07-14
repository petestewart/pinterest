import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';
import utils from '../../helpers/utils';

const logoutEvent = () => {
  $('#navbar-logout-button').click((e) => {
    e.preventDefault();
    firebase.auth().signOut();
    utils.printToDom('#header', '');
    utils.printToDom('#content', '');
  });
};

export default { logoutEvent };
