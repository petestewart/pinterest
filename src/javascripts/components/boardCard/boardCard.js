// import utils from '../../helpers/utils';
// import pinData from '../../helpers/data/pinData';

const boardCardMaker = (board) => {
  const domString = `
  <div class="card" id =${board.id} style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${board.name}</h5>
    <p class="card-text">(preview will go here)</p>
  </div>
</div>
  `;
  return domString;
};

export default { boardCardMaker };
