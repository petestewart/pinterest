import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import boardCard from '../boardCard/boardCard';
import singleBoard from '../pinList/pinList';

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
      // $('body').on('click', '.card', console.error('clicked'));
      $('body').on('click', '.card', singleBoard.showBoard);
    })
    .catch((error) => console.error('getUserBoards broke ', error));
};

export default { createBoards };
