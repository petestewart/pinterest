import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData'; // also dependency cycle error
import utils from '../../helpers/utils';

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
          $('#delete-pin').click(pinData.deletePin);
        })
        .catch((err) => console.error(err));
    });
// target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].id
};

export default { pinEditWindow };
