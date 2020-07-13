import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import userData from '../../helpers/data/userData';
import pinList from '../pinList/pinList';
import './editPin.scss';

const setBoardEvent = (e) => {
  e.preventDefault();
  const pinId = e.target.dataset.pinid;
  const newBoard = $('#set-new-board').val();
  pinData.updatePin(pinId, newBoard)
    .then(() => setTimeout(() => { pinList.showBoard(newBoard); }, 1000))
    .catch((err) => console.error(err));
};

const pinEditWindow = (e) => {
  let pin = '';
  const pinId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].id;
  pinData.getSinglePin(pinId)
    .then((pinResponse) => {
      pin = pinResponse;
      let domString = `
      <div class="pin-info-header">
        <div>
        <button type="button" class="btn btn-danger mb-5" id="delete-pin" data="${pin.pinId}">Delete pin</button>
      `;
      boardData.getUserBoards(pin.uid)
        .then((boards) => {
          domString += `
          <form>
          <div class="form-group">
            <label for="set-new-board"></label>
            <select class="form-control mb-3" id="set-new-board">`;
          boards.forEach((board) => {
            domString += `<option value="${board.id}"`;
            if (pin.boardId === board.id) {
              domString += ' selected';
            }
            domString += `>${board.name}</option>`;
          });
          domString += `
        </select>
      
      <button type="submit" class="btn btn-primary" data-pinid="${pinId}"  id="set-board">Change board</button>
      </div>
    </form>
    </div>
    <div>
    <button class="cancel-pin-edit" data-pinid="${pinId}"><i class="fas fa-times cancel-pin-edit" data-pinid="${pinId}"></i></button>
    </div>
    </div>
    `;
          utils.printToDom('#edit', domString);
        })
        .catch((err) => console.error(err));
    });
};

const showForm = (userId, boardBind) => {
  let domString = `
  <form id="add-pin-form">
    <div class="form-group">
      <label for="pin-url">URL</label>
      <input type="text" class="form-control" id="pin-url">
    </div>
    <div class="form-group">
      <label for="pin-board">Board</label>
      <select class="form-control" id="pin-board">`;

  boardData.getUserBoards(userId)
    .then((boards) => {
      boards.forEach((board) => {
        domString += `<option value="${board.id}"`;
        if (boardBind === board.id) {
          domString += ' selected';
        }
        domString += `>${board.name}</option>`;
      });
      domString += `
        </select>
      </div>
      <button type="submit" class="btn btn-primary" id="pin-creator">Submit</button>
    </form>
    `;
      utils.printToDom('#content', domString);
    })
    .catch((err) => console.error(err));
};

const addPin = (e) => {
  const boardBind = e.target.dataset.boardbind;
  const userId = utils.getCurrentUserId();
  userData.getAvatar(userId)
    .then((avatar) => {
      const headerString = `
        <div><img src="${avatar}" class="avatar-l home-button" alt="profile pic"></div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8"><h4 class="text-center mt-3">Create New Pin</h4></div>
          <div class="col-2 home-button">
            <button class="home-button" id="pin1">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
    `;
      utils.printToDom('#header', headerString);
    });
  showForm(userId, boardBind);
};

const addPinEvent = (e) => {
  e.preventDefault();
  const uid = utils.getCurrentUserId();
  const newPinObj = {
    boardId: $('#pin-board').val(),
    url: $('#pin-url').val(),
    pinId: `pin${Date.now()}`,
    uid,
  };
  pinData.addPin(newPinObj)
    .then(() => {
      pinList.showBoard($('#pin-board').val());
    })
    .catch((err) => console.error('could not add pin', err));
};

export default {
  pinEditWindow, showForm, addPin, addPinEvent, setBoardEvent,
};
