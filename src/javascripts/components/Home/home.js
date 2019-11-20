import './home.scss';
import util from '../../helpers/utilities';

const printHome = () => {
  const domString = `
  <div class="row">
  <div class="col activateMenu cursor" id="menu">Menu</div>
  <div class="col activateInventory cursor" id="inventory">Inventory</div>
  <div class="col activateStaff cursor" id="staff">Staff</div>
  <div class="col activateSeatingChart cursor" id="seatingChart">Seating Chart</div>
  <div class="col activateReservations cursor" id="reservation">Reservations</div>
</div> 
`;
  util.printToDom('printComponent', domString);
};

export default { printHome };
