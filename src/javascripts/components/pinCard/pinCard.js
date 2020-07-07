import './pinCard.scss';
import pinList from '../pinList/pinList';

const pinCardString = (pin) => {
  const domString = `
  <div class="single-pin-container">
    <div class="pin-image" id=${pin.id}>
      <img class="" src="${pin.url}" alt="${pin.id}">
      </div>
      <div id="edit">
        <div class="pin-info-header">
          <div>
          <img src="${pin.avatar}" class="avatar-mini home-button">
            saved to <strong class="board-link" id="${pin.boardId}">${pin.boardName}</strong>
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
  pinList.getHeaderInfo(pin.boardId)
    .then((response) => {
      console.error(`pinCardMaker recieved ${response.boardName} and ${response.avatar}`);
      pinObject.boardName = response.boardName;
      pinObject.avatar = response.avatar;
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

export default {
  pinCardMaker, showEditButton, hideEditButton,
};
