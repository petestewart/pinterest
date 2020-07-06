import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';

const deletePinEvent = (e) => {
  const pinId = e.target.attributes[3].value;
  console.error(`about to delete ${pinId}`);
  smash.totallyDeletePin(pinId);
  // after this I need to redraw the board, but importing pinList.js creates a dependency cycle
};

const pinEditWindow = (e) => {
  let pin = '';
  const pinId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].id;
  pinData.getSinglePin(pinId)
    .then((pinResponse) => {
      pin = pinResponse;
      let domString = `
      <button type="button" class="btn btn-danger" id="delete-pin" data="${pin.pinId}">Delete pin</button>
      `;
      boardData.getBoardName(pin.boardId)
        .then((response) => {
          domString += `<p class="mt-3">Current board: <strong>${response}</strong></p>`;
          utils.printToDom('#edit', domString);
          $('#delete-pin').click(deletePinEvent);
        })
        .catch((err) => console.error(err));
    });
};

export default { pinEditWindow };
