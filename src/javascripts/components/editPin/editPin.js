import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const pinEditWindow = (e) => {
  let pin = '';
  const pinId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].id;
  pinData.getSinglePin(pinId)
    .then((pinResponse) => {
      pin = pinResponse;
      let domString = `
      <div class="pin-info-header">
        <div>
        <button type="button" class="btn btn-danger" id="delete-pin" data="${pin.pinId}">Delete pin</button>
      `;
      boardData.getBoardName(pin.boardId)
        .then((response) => {
          domString += `
            <p class="mt-3">Current board: <strong>${response}</strong></p>
          </div>
          <div><button class="cancel-edit" id=${pin.pinId}><i class="fas fa-times"></i></button></div>`;
          utils.printToDom('#edit', domString);
        })
        .catch((err) => console.error(err));
    });
};

export default { pinEditWindow };
