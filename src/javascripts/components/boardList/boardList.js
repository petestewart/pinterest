import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import boardCard from '../boardCard/boardCard';
import userData from '../../helpers/data/userData';
import './boardList.scss';

const showForm = () => {
  const domString = `
  <form id="add-board-form">
    <div class="form-group">
      <label for="board-name">Name</label>
      <input type="text" class="form-control" id="board-name">
    </div>
    <button type="submit" class="btn btn-primary" id="board-creator">Submit</button>
  </form>
  `;
  utils.printToDom('#content', domString);
};

const addBoard = () => {
  const userId = utils.getCurrentUserId();
  userData.getAvatar(userId)
    .then((avatar) => {
      const headerString = `
        <div><img src="${avatar}" class="avatar-l home-button" alt="profile pic"></div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8"><h4 class="text-center mt-3">Create New Board</h4></div>
          <div class="col-2 home-button">
            <button class="home-button" id="pin1">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
    `;
      utils.printToDom('#header', headerString);
    });
  showForm();
};

const addBoardEvent = (e) => {
  e.preventDefault();
  const uid = utils.getCurrentUserId();
  const newBoardObj = {
    name: $('#board-name').val(),
    color: 'lightblue',
    uid,
  };
  // console.error(newBoard);
  boardData.addBoard(newBoardObj)
    .then(() => {
      console.error('should have created ', newBoardObj);
      // eslint-disable-next-line no-use-before-define
      createBoards();
    })
    .catch((err) => console.error('could not add board', err));
};

const createBoardsHeader = (userId) => {
  let headerString = '';
  userData.getAvatar(userId)
    .then((avatar) => {
      headerString = `
        <div><img src="${avatar}" class="avatar-l home-button" alt="profile pic"></div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8"><h2 class="text-center">Your Boards</h2></div>
          <div class="col-2 add-button">
            <button class="btn" type="button" data-toggle="collapse" data-target="#add-type-menu" aria-expanded="false" aria-controls="add-type-menu">
              <i class="fas fa-plus-square"></i>
            </button>
            <div class="collapse add-type-menu" id="add-type-menu">
              <div class="card card-body">
                <div class="edit-menu-item" id="add-board">Board</div>
                <div class="edit-menu-item" id="add-pin">Pin</div>
              </div>
            </div>
          </div>
        </div>
    `;
      utils.printToDom('#header', headerString);
    });
};

const createBoards = () => {
  let domString = '';
  const userId = utils.getCurrentUserId();
  createBoardsHeader(userId);
  boardData.getUserBoards(userId)
    .then((boards) => {
      boards.forEach((board) => {
        boardCard.boardCardMaker(board)
          .then((response) => {
            domString += response;
          })
          .then(() => {
            utils.printToDom('#content', domString);
            // $('#edit-button').click(TODO: EDIT BOARD FUNCTION); **
            // $('body').on('mouseenter', '.board-selector', (e) => {
            //   boardCard.showEditButton(e);
            // });
            // $('body').on('mouseleave', '.board-selector', (e) => {
            //   boardCard.hideEditButton(e);
            // });
          });
      });
    })
    .catch((error) => console.error('getUserBoards broke ', error));
};

export default { createBoards, addBoard, addBoardEvent };
