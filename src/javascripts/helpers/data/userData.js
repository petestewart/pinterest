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

export default { getUserById, getAvatar };
