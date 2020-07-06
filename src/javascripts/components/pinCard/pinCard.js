import './pinCard.scss';
import boardData from '../../helpers/data/boardData';

const pinCardString = (pin) => {
  const domString = `
  <div class="single-pin-container">
    <div class="pin-image" id=${pin.id}>
      <img class="" src="${pin.url}" alt="${pin.id}">
      </div>
      <div id="edit">
        <div class="pin-info-header">
          <div>
            saved to <strong>${pin.boardName}</strong>
          </div>
          <div>  
            <button id="edit-button" class="hide"><i class="fas fa-edit"></i></button>
          </div>
        </div>
      </div>
  </div>
  `;
  return domString;
};

const pinCardMaker = (pin) => new Promise((resolve, reject) => {
  const pinObject = pin;
  boardData.getBoardName(pin.boardId)
    .then((response) => {
      pinObject.boardName = response;
      const domString = pinCardString(pinObject);
      resolve(domString);
    })
    .catch((err) => reject(err));
});

const showEditButton = () => {
  $('#edit-button').removeClass('hide');
};

const hideEditButton = () => {
  $('#edit-button').addClass('hide');
};

export default { pinCardMaker, showEditButton, hideEditButton };
