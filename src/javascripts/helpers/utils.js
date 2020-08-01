import firebase from 'firebase/app';
import 'firebase/auth';

const printToDom = (selector, text) => {
  $(selector).html(text);
};

const getCurrentUserId = () => {
  const user = firebase.auth().currentUser;
  return user.uid;
};

const alphabetize = (array, key) => {
  array.sort((a, b) => {
    if (a[key] < b[key]) { return -1; }
    if (a[key] > b[key]) { return 1; }
    return 0;
  });
  return array;
};

export default { printToDom, getCurrentUserId, alphabetize };
