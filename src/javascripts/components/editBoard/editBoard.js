import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import boardList from '../boardList/boardList';
import boardCard from '../boardCard/boardCard';
import './editBoard.scss';

const turnOnEditMode = () => {
  $('.edit-button').addClass('hide');
  $('body').off('mouseenter', '.board-selector');
};

const turnOffEditMode = () => {
  $('body').on('mouseenter', '.board-selector', (e) => {
    boardCard.showEditButton(e);
  });
};

const editBoardWindow = (e) => {
  e.stopPropagation();
  turnOnEditMode();
  const boardId = e.target.closest('button').dataset.boardid;
  const domString = `
    <div class="board-edit-area">
      <button type="button" class="btn btn-danger" id="delete-board" data-boardId="${boardId}">Delete board</button>
      <button type="button" class="close cancel-board-edit" data-boardId="${boardId}" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`;
  utils.printToDom(`#${boardId}-preview`, domString);
};

const cancelBoardEdit = (e) => {
  e.stopPropagation();
  boardList.createBoards();
  turnOffEditMode();
};

const deleteBoard = (e) => {
  e.stopPropagation();
  const boardId = e.target.closest('button').dataset.boardid;
  boardData.deleteBoard(boardId)
    .then(() => {
      utils.printToDom(`#${boardId}-preview`, 'Board deleted!');
      boardList.createBoards();
      turnOffEditMode();
    })
    .catch((err) => { console.error('deleteBoard failed ', err); });
};

export default { editBoardWindow, cancelBoardEdit, deleteBoard };
