import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';

const pinEditWindow = () => {
  let domString = `
  <button type="button" class="btn btn-danger" id="delete-pin">Delete pin</button>
  `;
  boardData.getBoardName('board1')
    .then((response) => {
      domString += `<p class="mt-3">Current board: <strong>${response}</strong></p>`;
      utils.printToDom('#edit', domString);
    })
    .catch((err) => console.error(err));
};

export default { pinEditWindow };
