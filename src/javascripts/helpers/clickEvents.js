import pinData from './data/pinData';
import smash from './data/smash';
import pinList from '../components/pinList/pinList';
import singlePin from '../components/singlePin/singlePin';

const deletePinClick = (e) => {
  const pinId = e.target.attributes[3].value;
  console.error(`dPC: about to delete ${pinId}`);
  pinData.deletePin(pinId);
  smash.totallyDeletePin(pinId)
    .then((boardId) => {
      pinList.showBoard(boardId);
    });
};

const clickEvents = () => {
  $('body').on('click', '#delete-pin', deletePinClick);
  $('body').on('mouseenter', '.pin', (event) => {
    event.target.closest('.card').classList.add('hovering');
  });
  $('body').on('mouseleave', '.pin', (event) => {
    event.target.closest('.card').classList.remove('hovering');
  });
  $('body').on('click', '.pin', singlePin.showPin);
  $('body').on('click', '.pin-selector', pinList.showBoardEvent);
};

export default { clickEvents };
