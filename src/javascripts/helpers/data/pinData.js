import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const pinsObjects = response.data;
      const boardPins = [];
      Object.keys(pinsObjects).forEach((pinId) => {
        pinsObjects[pinId].id = pinId;
        boardPins.push(pinsObjects[pinId]);
      });
      resolve(boardPins);
    })
    .catch((err) => reject(err));
});

const getSinglePin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`)
    .then((response) => {
      const pins = response.data;
      const singlePin = pins[pinId];
      resolve(singlePin);
    })
    .catch((err) => reject(err));
});

export default { getBoardPins, getSinglePin };
