// import pinData from '../../helpers/data/pinData';
import './boardCard.scss';

const boardPreview = (board) => {
  let domString = '';
  board.pins.forEach((pin) => {
    domString += `<img src="${pin.url}">`;
  });
  return domString;
};

const showEditButton = (e) => {
  const boardId = e.target.closest('.card').id;
  $(`#edit-${boardId}`).removeClass('hide');
};

const hideEditButton = (e) => {
  const boardId = e.target.closest('.card').id;
  $(`#edit-${boardId}`).addClass('hide');
};

const boardCardMaker = (board) => {
  const preview = boardPreview(board);
  const domString = `
      <div class="card board-selector" id=${board.id} style="width: 18rem;">
      <div class="card-body">
        <div class="card-title board-card-title">
          <h3>${board.name}</h3> 
          <button id="edit-${board.id}" class="edit-button board-edit-button hide" data-boardid="${board.id}"><i class="fas fa-edit"></i>
        </div>
        <div class="board-preview" id="${board.id}-preview">${preview}</div>
      </div>
    </div>
      `;
  return domString;
};

export default { boardCardMaker, showEditButton, hideEditButton };
