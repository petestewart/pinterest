import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import userData from '../../helpers/data/userData';
import pinList from '../pinList/pinList';

const pinEditWindow = (e) => {
  let pin = '';
  const pinId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].id;
  pinData.getSinglePin(pinId)
    .then((pinResponse) => {
      pin = pinResponse;
      let domString = `
      <div class="pin-info-header">
        <div>
        <button type="button" class="btn btn-danger" id="delete-pin" data="${pin.pinId}">Delete pin</button>
      `;
      boardData.getBoardName(pin.boardId)
        .then((response) => {
          domString += `
            <p class="mt-3">Current board: <strong>${response}</strong></p>
          </div>
          <div><button class="cancel-edit" id="${pin.id}"><i class="fas fa-times"></i></button></div>`;
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
        console.error(board.name);
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
    boardId: $('#pin-board').val(), // make the Id
    url: $('#pin-url').val(),
    pinId: `pin${Date.now()}`,
    uid,
  };
  pinData.addPin(newPinObj)
    .then(() => {
      console.error('should have created', newPinObj);
      pinList.showBoard($('#pin-board').val());
    })
    .catch((err) => console.error('could not add pin', err));
};

export default {
  pinEditWindow, showForm, addPin, addPinEvent,
};
