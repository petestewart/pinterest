import utils from '../../helpers/utils';

const createBoards = () => {
  const domString = '<h1>BOARDS</h1>';
  utils.printToDom('#boards', domString);
};

export default { createBoards };
