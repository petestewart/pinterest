import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import pinCard from '../pinCard/pinCard';
import editWindow from '../editWindow/editWindow';

// const showPin = (e) => {
//   const pinId = e.target.closest('.card').id;
//   pinData.getSinglePin(pinId)
//     .then((pin) => {
//       utils.printToDom('#header', '');
//       const domString = pinCard.pinCardMaker(pin);
//       utils.printToDom('#content', domString);
//       $('#edit-button').click(editWindow.pinEditWindow);
//       $('body').on('mouseenter', '#edit', () => {
//         pinCard.showEditButton();
//       });
//       $('body').on('mouseleave', '#edit', () => {
//         pinCard.hideEditButton();
//       });
//     })
//     .catch((err) => console.error('showPin broke', err));
// };

const showPin = (e) => {
  const pinId = e.target.closest('.card').id;
  pinData.getSinglePin(pinId)
    .then((pin) => {
      utils.printToDom('#header', '');
      pinCard.pinCardMaker(pin)
        .then((domString) => {
          utils.printToDom('#content', domString);
          $('#edit-button').click(editWindow.pinEditWindow);
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
