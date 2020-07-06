import pinData from './pinData';

const totallyDeletePin = (pinId) => new Promise((resolve, reject) => {
  let boardId = '';
  pinData.getSinglePin(pinId)
    .then((pin) => {
      boardId = pin.boardId;
    })
    .then(() => {
      pinData.deletePin(pinId);
    })
    .then(() => {
      resolve(boardId);
    })
    .catch((err) => reject(err));
});

export default { totallyDeletePin };
