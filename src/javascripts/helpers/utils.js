import firebase from 'firebase/app';
import 'firebase/auth';

const printToDom = (selector, text) => {
  $(selector).html(text);
};

const getCurrentUserId = () => {
  const user = firebase.auth().currentUser;
  return user.uid;
};

export default { printToDom, getCurrentUserId };
