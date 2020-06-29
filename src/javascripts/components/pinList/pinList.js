import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import './pinList.scss';

const showBoard = (e) => {
  const boardId = e.currentTarget.id;
  pinData.getBoardPins(boardId)
    .then((pins) => {
      utils.printToDom('#header', `<h2 class="text-center">${boardId}</h2>`);
      let domString = '';
      pins.forEach((pin) => {
        domString += `<img src="${pin.url}">`;
      });
      utils.printToDom('#content', domString);
    })
    .catch((err) => console.error('showBoard broke', err));
};

export default { showBoard };
