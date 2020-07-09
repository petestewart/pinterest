import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import boardCard from '../boardCard/boardCard';
import userData from '../../helpers/data/userData';

const createBoardsHeader = (userId) => {
  let headerString = '';
  userData.getAvatar(userId)
    .then((avatar) => {
      headerString = `
        <div><img src="${avatar}" class="avatar-l home-button" alt="profile pic"></div>
        <h2 class="text-center">Your Boards</h2>
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
            $('body').on('mouseenter', '.board-selector', (e) => {
              boardCard.showEditButton(e);
            });
            $('body').on('mouseleave', '.board-selector', (e) => {
              boardCard.hideEditButton(e);
            });
          });
      });
    })
    .catch((error) => console.error('getUserBoards broke ', error));
};

export default { createBoards };
