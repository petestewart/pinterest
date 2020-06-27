import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import auth from './components/auth/auth';
import navbar from './components/navbar/navbar';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  authData.checkLoginStatus();
  auth.createLoginButton();
  navbar.logoutEvent();
  $('body').on('mouseenter', '.card', (e) => {
    e.target.closest('.card').classList.add('bg-dark');
  });
  $('body').on('mouseleave', '.card', (e) => {
    e.target.closest('.card').classList.remove('bg-dark');
  });
};

init();
