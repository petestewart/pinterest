import pinData from './data/pinData';
import smash from './data/smash';
import pinList from '../components/pinList/pinList';
import singlePin from '../components/singlePin/singlePin';
import boardList from '../components/boardList/boardList';

const deletePinClick = (e) => {
  const pinId = e.target.attributes[3].value;
  pinData.deletePin(pinId);
  smash.totallyDeletePin(pinId)
    .then((boardId) => {
      pinList.showBoard(boardId);
    });
};

const boardLinkEvent = (e) => {
  pinList.showBoard(e.target.id);
};

const pinLinkEvent = (e) => {
  singlePin.showPin(e.target.closest('button').id);
};

const showPinEvent = (e) => {
  const pinId = e.target.closest('.card').id;
  singlePin.showPin(pinId);
};

const clickEvents = () => {
  $('body').on('click', '#delete-pin', deletePinClick);
  $('body').on('mouseenter', '.pin', (event) => {
    event.target.closest('.card').classList.add('hovering');
  });
  $('body').on('mouseleave', '.pin', (event) => {
    event.target.closest('.card').classList.remove('hovering');
  });
  $('body').on('click', '.pin', showPinEvent);
  $('body').on('click', '.home-button', boardList.createBoards);
  $('body').on('click', '.cancel-edit', pinLinkEvent);
  $('body').on('click', '.board-link', boardLinkEvent);
  $('body').on('click', '.board-selector', pinList.showBoardEvent);
};

export default { clickEvents };
