import firebase from 'firebase/app';
import 'firebase/auth';
import home from '../../components/home/home';
import boardList from '../../components/boardList/boardList';
import userData from './userData';

const authDiv = $('#auth');
const appDiv = $('#app');
const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-button');
const navlink = $('.nav-link');
const profileLink = $('#profile-link');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userData.checkProfile(user)
        .then(() => {
          homeDiv.addClass('hide');
          authDiv.addClass('hide');
          appDiv.removeClass('hide');
          logoutButton.removeClass('hide');
          boardsDiv.removeClass('hide');
          navlink.removeClass('hide');
          profileLink.removeClass('hide');
          boardList.createBoards();
        })
        .catch((err) => console.error(err));
    } else {
      boardsDiv.addClass('hide');
      authDiv.removeClass('hide');
      appDiv.addClass('hide');
      logoutButton.addClass('hide');
      homeDiv.removeClass('hide');
      home.createHomepage();
      profileLink.addClass('hide');
      navlink.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
