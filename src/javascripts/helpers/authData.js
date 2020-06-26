import firebase from 'firebase/app';
import 'firebase/auth';
import home from '../components/home/home';
import boards from '../components/boards/boards';

const authDiv = $('#auth');
const appDiv = $('#app');
const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeDiv.addClass('hide');
      authDiv.addClass('hide');
      appDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      boardsDiv.removeClass('hide');
      boards.createBoards();
    } else {
      boardsDiv.addClass('hide');
      authDiv.removeClass('hide');
      appDiv.addClass('hide');
      logoutButton.addClass('hide');
      homeDiv.removeClass('hide');
      home.createHomepage();
    }
  });
};

export default { checkLoginStatus };
