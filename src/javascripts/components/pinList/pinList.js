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

const displayBoardHeader = (boardId) => {
  getHeaderInfo(boardId)
    .then((headerInfo) => {
      const headerString = `
      <div class="row">
        <div class="col-2 left"></div>
        <div class="col-8 center">
          <div>
            <img src="${headerInfo.avatar}" class="avatar-s home-button" alt="profile pic">
            <span class="header-text">${headerInfo.boardName}</span>
          </div>
        </div>
        <div class="col-2 add-button">
          <button class="btn" type="button">
            <i class="fas fa-plus-square" id="add-pin" data-boardBind="${boardId}"></i>
          </button>
        </div>
      </div>`;
      utils.printToDom('#header', headerString);
    });
};

const generatePin = (pin) => new Promise((resolve, reject) => {
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
  displayBoardHeader(boardId);
  let domString = '';
  pinData.getBoardPins(boardId)
    .then((pins) => {
      if (pins.length === 0) {
        utils.printToDom('#content', `<h2 id="add-pin" data-boardBind="${boardId}">Add your first pin!</h2>`);
      } else {
        pins.forEach((pin, index, array) => {
          generatePin(pin)
            .then((response) => {
              domString += response;
              if (index === array.length - 1) {
                utils.printToDom('#content', domString);
              }
            });
        });
      }
    })
    .catch((err) => console.error('showBoard broke', err));
};

const showBoardEvent = (e) => {
  const boardId = e.currentTarget.id;
  showBoard(boardId);
};

export default { showBoard, showBoardEvent, getHeaderInfo };
