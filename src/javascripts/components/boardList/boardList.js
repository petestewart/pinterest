import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import boardCard from '../boardCard/boardCard';

// const boardCard = (userId) => {
// };

const createBoards = () => {
  const userId = utils.getCurrentUserId();
  boardData.getUserBoards(userId)
    .then((boards) => {
      utils.printToDom('#header', '<h2 class="text-center">Your Boards</h2>');
      let domString = '';
      boards.forEach((board) => {
        domString += boardCard.boardCardMaker(board);
      });
      utils.printToDom('#content', domString);
      // TODO: make card clickable to display board and pins
    })
    .catch((error) => console.error('getUserBoards broke ', error));
};

export default { createBoards };
