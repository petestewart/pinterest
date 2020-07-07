import pinData from '../../helpers/data/pinData';
import './boardCard.scss';

const boardPreview = (boardId) => new Promise((resolve, reject) => {
  let domString = '';
  pinData.getBoardPins(boardId)
    .then((pins) => {
      pins.forEach((pin) => {
        domString += `<img src="${pin.url}">`;
      });
      resolve(domString);
    })
    .catch((err) => reject(err));
});

const boardCardMaker = (board) => new Promise((resolve, reject) => {
  boardPreview(board.id)
    .then((response) => {
      const domString = `
      <div class="card pin-selector" id =${board.id} style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${board.name}</h5>
        <div class="board-preview">${response}</div>
      </div>
    </div>
      `;
      resolve(domString);
    })
    .catch((err) => reject(err));
});

export default { boardCardMaker };
