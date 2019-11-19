import $ from 'jquery';
import authData from './data/authData';

const printToDom = (divId, textToPrint) => {
  $(`#${divId}`).html(textToPrint);
  authData.checkForUser();
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default { printToDom, currencyFormatter };
