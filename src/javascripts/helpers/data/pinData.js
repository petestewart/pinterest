import axios from 'axios';
import apiKeys from '../apiKeys.json';
import pinList from '../../components/pinList/pinList'; // <-- This was the first dependency error

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

const deletePin = (e) => new Promise(() => {
  const pinId = e.target.attributes[3].value;
  let boardId = '';
  getSinglePin(pinId)
    .then((pin) => {
      boardId = pin.boardId;
    })
    .then(() => {
      axios.delete(`${baseUrl}/pins/${pinId}.json`);
    })
    .then(() => {
      pinList.showBoard(boardId); // <-- This is what is supposed to redraw the board
    });
});

export default { getBoardPins, getSinglePin, deletePin };
