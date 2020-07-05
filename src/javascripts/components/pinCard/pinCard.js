import './pinCard.scss';
import boardData from '../../helpers/data/boardData';

// const pinCardMaker = (pin) => {
//   boardData.getBoardName(pin.boardId)
//     .then((response) => {
//       const domString = `
//       <div class="single-pin-container">
//         <div class="pin-image" id=${pin.id}>
//           <img class="" src="${pin.url}" alt="${pin.name}">
//           </div>
//           <div id="edit">
//             <div class="pin-info-header">
//               <h2>${response}</h2>
//               <button id="edit-button" class="hide"><i class="fas fa-edit"></i></button>
//             </div>
//           <p>description goes here</p>
//           </div>
//       </div>
//       `;
//       return domString;
//     })
//     .catch((err) => console.error(err));
// };

const pinCardString = (pin) => {
  const domString = `
  <div class="single-pin-container">
    <div class="pin-image" id=${pin.id}>
      <img class="" src="${pin.url}" alt="${pin.name}">
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

// boardData.getBoardName(pin.boardId)
//   .then((response) => {
//     console.error(response);
//     const domString = pinCardString(pin);
//     return domString;

const showEditButton = () => {
  $('#edit-button').removeClass('hide');
};

const hideEditButton = () => {
  $('#edit-button').addClass('hide');
};

export default { pinCardMaker, showEditButton, hideEditButton };
