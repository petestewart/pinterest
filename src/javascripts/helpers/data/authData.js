import firebase from 'firebase/app';
import 'firebase/auth';
import home from '../../components/home/home';
import boardList from '../../components/boardList/boardList';

const authDiv = $('#auth');
const appDiv = $('#app');
const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-button');
const navlink = $('.nav-link');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeDiv.addClass('hide');
      authDiv.addClass('hide');
      appDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      boardsDiv.removeClass('hide');
      navlink.removeClass('hide');
      boardList.createBoards();
    } else {
      boardsDiv.addClass('hide');
      authDiv.removeClass('hide');
      appDiv.addClass('hide');
      logoutButton.addClass('hide');
      homeDiv.removeClass('hide');
      home.createHomepage();
      navlink.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
