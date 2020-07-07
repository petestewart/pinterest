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

const showEditButton = (e) => {
  const boardId = e.target.closest('.card').id;
  $(`#edit-${boardId}`).removeClass('hide');
};

const hideEditButton = (e) => {
  const boardId = e.target.closest('.card').id;
  $(`#edit-${boardId}`).addClass('hide');
};

const boardCardMaker = (board) => new Promise((resolve, reject) => {
  boardPreview(board.id)
    .then((preview) => {
      const domString = `
      <div class="card board-selector" id =${board.id} style="width: 18rem;">
      <div class="card-body">
        <div class="card-title board-card-title">
          <h3>${board.name}</h3> 
          <button id="edit-${board.id}" class="edit-button hide"><i class="fas fa-edit"></i>
        </div>
        <div class="board-preview">${preview}</div>
      </div>
    </div>
      `;
      resolve(domString);
    })
    .catch((err) => reject(err));
});

export default { boardCardMaker, showEditButton, hideEditButton };
