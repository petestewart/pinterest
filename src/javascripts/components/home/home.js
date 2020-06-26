import utils from '../../helpers/utils';

const createHomepage = () => {
  const domString = '<h1>PINTERST</h1>';
  utils.printToDom('#home', domString);
};

export default { createHomepage };
