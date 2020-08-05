// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import auth from './components/auth/auth';
import navbar from './components/navbar/navbar';
import clickEvents from './helpers/clickEvents';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  authData.checkLoginStatus();
  auth.createLoginButton();
  navbar.logoutEvent();
  clickEvents.clickEvents();
};

init();
