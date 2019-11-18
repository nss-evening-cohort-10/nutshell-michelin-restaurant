import $ from 'jquery';
import authData from './data/authData';

const printToDom = (divId, textToPrint) => {
  $(`#${divId}`).html(textToPrint);
  authData.checkForUser();
};

export default { printToDom };
