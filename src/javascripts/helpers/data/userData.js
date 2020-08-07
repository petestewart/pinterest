import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getUserById = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const userId = Object.keys(response.data)[0];
      resolve(response.data[userId]);
    })
    .catch((err) => reject(err));
});

const getAvatar = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => {
      const userKey = Object.keys(response.data)[0];
      resolve(response.data[userKey].profilePic);
    })
    .catch((err) => reject(err));
});

const updateProfile = (changes) => new Promise((resolve, reject) => {
  const user = firebase.auth().currentUser;
  axios.patch(`${baseUrl}/users/${user.uid}.json`, changes)
    .then(() => resolve())
    .catch((err) => reject(err));
});

export default { getUserById, getAvatar, updateProfile };
