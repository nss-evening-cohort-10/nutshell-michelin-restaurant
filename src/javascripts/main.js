import 'bootstrap';
import '../styles/main.scss';
import utilities from './helpers/utilities';

const init = () => {
  utilities.printToDom('loggedInDiv', '<button class="btn btn-light">test button</button>');
};

init();
