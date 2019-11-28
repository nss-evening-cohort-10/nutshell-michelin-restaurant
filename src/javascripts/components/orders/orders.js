import $ from 'jquery';
import orderData from '../../helpers/data/orderData';

const saveNewOrders = (reservationId) => {
  if (document.querySelector('.checkbox:checked') !== null) {
    if (document.querySelector('.quantity') > 1) {
      console.log('more than one');
    } else {
      $('#save-assign-menu').on('click', () => {
        $('#assign-menu-modal').modal('hide');
        const menuId = $('.checkbox-menu').val();
        const newOrderObj = {};
        newOrderObj.menuItemId = menuId;
        newOrderObj.reservationId = reservationId;
        orderData.addOrder(newOrderObj)
          .then(() => {
            $('#assign-menu-modal').modal('hide');
          })
          .catch((error) => console.error(error));
      });
    }
  } else {
    console.log('don\'t do anything');
  }
};

export default { saveNewOrders };
