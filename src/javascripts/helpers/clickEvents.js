import pinData from './data/pinData';
import smash from './data/smash';
import pinList from '../components/pinList/pinList';

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
};

export default { clickEvents };
