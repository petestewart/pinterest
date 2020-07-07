import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';
// import singlePin from '../singlePin/singlePin';
import utils from '../../helpers/utils';
import userData from '../../helpers/data/userData';
import './pinList.scss';

const makePin = (pin) => new Promise((resolve, reject) => {
  const userId = pin.uid;
  userData.getUserById(userId)
    .then((response) => {
      const userName = response.name;
      const domString = `
      <div class="card pin" id="${pin.id}" style="width: 15rem;">
        <img class="card-img-top" src="${pin.url}" alt="${pin.id}">
        <div class="card-body">
          <p class="pin-text">pinned by ${userName}</p>
        </div>
      </div>
      `;
      resolve(domString);
    })
    .catch((err) => reject(err));
});

const showBoard = (boardId) => {
  let domString = '';
  console.error('showBoard called');
  pinData.getBoardPins(boardId)
    .then((pins) => {
      pins.forEach((pin) => {
        makePin(pin)
          .then((response) => {
            domString += response;
          })
          .then(() => {
            utils.printToDom('#content', domString);
          });
      });
    })
    .then(() => {
      boardData.getBoardName(boardId)
        .then((response) => {
          utils.printToDom('#header', `<h2 class="text-center">${response}</h2>`);
        });
    })
    .catch((err) => console.error('showBoard broke', err));
};

const showBoardEvent = (e) => {
  const boardId = e.currentTarget.id;
  showBoard(boardId);
};

export default { showBoard, showBoardEvent };
