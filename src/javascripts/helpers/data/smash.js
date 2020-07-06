import pinData from './pinData';
// import pinList from '../../components/pinList/pinList';

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
      console.error(`smash: I obtained ${boardId} but someone else needs to redraw it`);
      // pinList.showBoard(boardId);
      resolve(boardId);
    })
    .catch((err) => reject(err));
});

export default { totallyDeletePin };
