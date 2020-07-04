import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const showPin = (e) => {
  const pinId = e.target.closest('.card').id;
  pinData.getSinglePin(pinId)
    .then((pin) => {
      const domString = `<img src="${pin.url}">`;
      utils.printToDom('#content', domString);
    })
    .catch((err) => console.error('showPin broke', err));
};

export default { showPin };
