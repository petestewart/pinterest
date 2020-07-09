import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';
import userData from '../../helpers/data/userData';
import './pinList.scss';

const getHeaderInfo = (boardId) => new Promise((resolve, reject) => {
  const userId = utils.getCurrentUserId();
  let boardName = '';
  let avatar = '';
  boardData.getBoardName(boardId).then((response) => { boardName = response; })
    .then(() => {
      userData.getAvatar(userId).then((response) => { avatar = response; })
        .then(() => {
          const headerInfo = { boardName, avatar };
          resolve(headerInfo);
        });
    })
    .catch((err) => { reject(err); });
});

const createBoardHeader = (boardId) => {
  getHeaderInfo(boardId)
    .then((headerInfo) => {
      const headerString = `
        <div class="header-chunk"><img src="${headerInfo.avatar}" class="avatar-s home-button" alt="profile pic">
        <span class="header-text">${headerInfo.boardName}</span></div>
        `;
      utils.printToDom('#header', headerString);
    });
};

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
  createBoardHeader(boardId);
  let domString = '';
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
    .catch((err) => console.error('showBoard broke', err));
};

const showBoardEvent = (e) => {
  const boardId = e.currentTarget.id;
  showBoard(boardId);
};

export default { showBoard, showBoardEvent, getHeaderInfo };
