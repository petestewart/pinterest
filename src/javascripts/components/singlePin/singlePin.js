import editPin from '../editPin/editPin';
import pinCard from '../pinCard/pinCard';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const showPin = (pinId) => {
  console.error(pinId);
  pinData.getSinglePin(pinId)
    .then((pin) => {
      utils.printToDom('#header', '');
      pinCard.pinCardMaker(pin)
        .then((domString) => {
          utils.printToDom('#content', domString);
          $('.pin-edit-button').click(editPin.pinEditWindow);
          $('body').on('mouseenter', '#edit', () => {
            pinCard.showEditButton();
          });
          $('body').on('mouseleave', '#edit', () => {
            pinCard.hideEditButton();
          });
        });
    })
    .catch((err) => console.error('showPin broke', err));
};

export default { showPin };
