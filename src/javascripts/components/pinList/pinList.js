import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import userData from '../../helpers/data/userData';
import singlePin from '../singlePin/singlePin';
import './pinList.scss';

const makePin = (pin) => new Promise((resolve, reject) => {
  const userId = pin.uid;
  userData.getUserById(userId)
    .then((response) => {
      const userName = response.name;
      const domString = `
      <div class="card pin" id="${pin.id}" style="width: 15rem;">
        <img class="card-img-top" src="${pin.url}" alt="${pin.id}">
        <div class="card-body">
          <p class="pin-text">pinned by ${userName}</p>
        </div>
      </div>
      `;
      resolve(domString);
    })
    .catch((err) => reject(err));
});

// const makePin = (pin) => {
//   const userId = pin.uid;
//   const userObject = userData.getUserById(userId);
//   const userName = userObject.name;
//   const domString = `
//   <div class="card pin" id="${pin.id}" style="width: 15rem;">
//     <img class="card-img-top" src="${pin.url}" alt="${pin.id}">
//     <div class="card-body">
//       <p class="pin-text">pinned by ${userName}</p>
//     </div>
//   </div>
//   `;
//   return domString;
// };

// const showBoard = (e) => {
//   const boardId = e.currentTarget.id;
//   pinData.getBoardPins(boardId)
//     .then((pins) => {
//       utils.printToDom('#header', `<h2 class="text-center">${boardId}</h2>`);
//       let domString = '';
//       pins.forEach((pin) => {
//         domString += makePin(pin);
//       });
//       utils.printToDom('#content', domString);
//       $('body').on('mouseenter', '.pin', (event) => {
//         event.target.closest('.card').classList.add('bg-dark');
//       });
//       $('body').on('mouseleave', '.pin', (event) => {
//         event.target.closest('.card').classList.remove('bg-dark');
//       });

//       $('body').on('click', '.pin', singlePin.showPin);
//     })
//     .catch((err) => console.error('showBoard broke', err));
// };

const showBoard = (e) => {
  const boardId = e.currentTarget.id;
  pinData.getBoardPins(boardId)
    .then((pins) => {
      utils.printToDom('#header', `<h2 class="text-center">${boardId}</h2>`);
      utils.printToDom('#content', '');
      const contentDiv = $('#content');
      pins.forEach((pin) => {
        makePin(pin)
          .then((response) => { contentDiv.append(response); });
      });
      $('body').on('mouseenter', '.pin', (event) => {
        event.target.closest('.card').classList.add('bg-dark');
      });
      $('body').on('mouseleave', '.pin', (event) => {
        event.target.closest('.card').classList.remove('bg-dark');
      });
      $('body').on('click', '.pin', singlePin.showPin);
    })
    .catch((err) => console.error('showBoard broke', err));
};

export default { showBoard };
