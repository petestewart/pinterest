import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import boardCard from '../boardCard/boardCard';
// import pinList from '../pinList/pinList';

// const createBoards = () => {
//   let domString = '';
//   const userId = utils.getCurrentUserId();
//   boardData.getUserBoards(userId)
//     .then((boards) => {
//       utils.printToDom('#header', '<h2 class="text-center">Your Boards</h2>');
//       boards.forEach((board) => {
//         boardCard.boardCardMaker(board)
//           .then((response) => {
//             domString += response;
//           })
//           .then(() => {
//             utils.printToDom('#content', domString);
//           });
//       });
//     })
//     .catch((error) => console.error('getUserBoards broke ', error));
// };

const createBoards = () => {
  let domString = '';
  const userId = utils.getCurrentUserId();
  boardData.getUserBoards(userId)
    .then((boards) => {
      utils.printToDom('#header', '<h2 class="text-center">Your Boards</h2>');
      boards.forEach((board) => {
        boardCard.boardCardMaker(board)
          .then((response) => {
            domString += response;
          })
          .then(() => {
            utils.printToDom('#content', domString);
          });
      });
    })
    .catch((error) => console.error('getUserBoards broke ', error));
};

export default { createBoards };
