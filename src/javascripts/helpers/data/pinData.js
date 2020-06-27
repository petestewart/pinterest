// import axios from 'axios';
// import apiKeys from '../apiKeys.json';

// const baseUrl = apiKeys.firebaseConfig.databaseURL;

// const getBoardPins = (boardId) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
//     .then((response) => {
//       const pinsObjects = response.data;
//       const boardPins = [];
//       Object.keys(pinsObjects).forEach((pinId) => {
//         pinsObjects[pinId].id = pinId;
//         boardPins.push(pinsObjects[pinId]);
//       });
//       console.error(boardPins);
//       resolve(boardPins);
//     })
//     .catch((err) => reject(err));
// });

// export default { getBoardPins };
