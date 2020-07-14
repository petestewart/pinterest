import utils from '../../helpers/utils';
import './home.scss';

const createHomepage = () => {
  const domString = `
  <div id="homescreen">
  <i class="fab fa-product-hunt fa-5x site-logo"></i>
  </div>`;
  utils.printToDom('#home', domString);
};

export default { createHomepage };
