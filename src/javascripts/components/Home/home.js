import './home.scss';
import util from '../../helpers/utilities';

const printHome = () => {
  const domString = `<div class="cardOfCards d-flex justify-content-around container">
        <div class="card d-flex">
          <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <h2>Le Baguette</h2>
              <button class="btn btn-primary activateLogin">Login</button>
              <button class="btn btn-danger activateLogout hide">Logout</button>
          </nav>
          <div class="card-body d-flex align-content-around flex-wrap justify-content-around">
            <div class="card homeCards" style="width: 18rem;">
              <div class="card-body text-center activateMenu">
                <h5 class="card-title"><i class="fas fa-book-open fa-5x"></i></h5>
                <h3 class="card-subtitle mb-2 text-muted">Menu</h3>
            </div>
          </div>
          <div class="card homeCards" style="width: 18rem;">
            <div class="card-body text-center activateInventory">
              <h5 class="card-title"><i class="fas fa-carrot fa-5x"></i></h5>
              <h3 class="card-subtitle mb-2 text-muted">Inventory</h3>
            </div>
          </div>
          <div class="card homeCards" style="width: 18rem;">
            <div class="card-body text-center activateStaff">
              <h5 class="card-title"><i class="fas fa-users fa-5x"></i></h5>
              <h3 class="card-subtitle mb-2 text-muted">Staff</h3>
            </div>
          </div>
          <div class="card homeCards" style="width: 18rem;">
            <div class="card-body text-center activateSeatingChart">
              <h5 class="card-title"><i class="fas fa-chair fa-5x"></i></h5>
              <h3 class="card-subtitle mb-2 text-muted">Seating Chart</h3>
            </div>
          </div>
          <div class="card homeCards" style="width: 18rem;">
            <div class="card-body text-center activateReservations">
              <h5 class="card-title"><i class="far fa-calendar-alt fa-5x"></i></h5>
              <h3 class="card-subtitle mb-2 text-muted">Reservations</h3>
             </div>
          </div>
        </div>
      </div>
    </div>`;
  util.printToDom('printComponent', domString);
};

export default { printHome };
