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
  axios.get(`${baseUrl}/pins/${pinId}.json`)
    .then((response) => {
      const singlePin = response.data;
      singlePin.id = pinId;
      resolve(singlePin);
    })
    .catch((err) => reject(err));
});

const addPin = (newPinObj) => axios.post(`${baseUrl}/pins.json`, newPinObj);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

export default {
  getBoardPins, getSinglePin, deletePin, addPin,
};
