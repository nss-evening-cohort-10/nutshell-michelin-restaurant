import './employees.scss';
import $ from 'jquery';
import employeeData from '../../helpers/data/employeesData';
import util from '../../helpers/utilities';

const deleteEmployeeOnClick = (e) => {
  e.preventDefault();
  const employeeId = $(e.target).attr('id');
  employeeData.deleteEmployeeData(employeeId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      displayStaff();
    })
    .catch((error) => console.error(error));
};

const displayStaff = () => {
  employeeData.employeesDataByEmployeeId()
    .then((employees) => {
      let domString = `
      <div class="d-flex justify-content-between m-2">
      <h1 class="whiteh1">Staff</h1>
      <div class="d-flex justify-content-end">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle editHeight" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Filter Employees
          </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button class="dropdown-item filterStaffButton" type="button" id="all">All Positions</button>
          <button class="dropdown-item filterStaffButton" type="button" id="SousChef">Sous Chef</button>
          <button class="dropdown-item filterStaffButton" type="button" id="ExecutiveSousChef">Executive Sous Chef</button>
          <button class="dropdown-item filterStaffButton" type="button" id="HeadChef">Head Chef</button>
          <button class="dropdown-item filterStaffButton" type="button" id="PastryChef">Pastry Chef</button>
          <button class="dropdown-item filterStaffButton" type="button" id="Chef">Chef</button>
          <button class="dropdown-item filterStaffButton" type="button" id="HeadSommelier">Head Sommelier</button>
          <button class="dropdown-item filterStaffButton" type="button" id="DirectorofOperations">Director of Operations</button>
          <button class="dropdown-item filterStaffButton" type="button" id="BarDirector">Bar Director</button>
          <button class="dropdown-item filterStaffButton" type="button" id="RestaurantManager">Restaurant Manager</button>
        </div>
        </div>
          <button class="btn btn-secondary cudButton hide cudButton hide whiteh1 cursor" data-toggle="modal" data-target="#createStaffModal"><i class="fas fa-plus"></i> Add Staff Member</button>
      </div>
      </div>
      <div class="container mx-auto">
      <div class="d-flex flex-wrap flex-row">
      `;
      employees.forEach((employee) => {
        domString += `
        <div class="card-deck card-deck-cstm">
          <div class="card bg-secondary">
            <img src="${employee.employeeImg}" alt="picture of ${employee.name}">
            <div class="card-body">
              <h5 class="card-title text-center">${employee.name}</h5>
              <h6 class="card-text text-center">${employee.position}</h6>
              <p class="card-text">
                <small class="text-muted d-flex justify-content-between">
                  <button class="btn btn-secondary cudButton hide cursor"><i class="fas fa-pencil-alt"></i></button>
                  <button class="btn btn-secondary cudButton hide cursor deleteEmployee" id=${employee.id}><i class="fas fa-trash-alt"></i></button>
                </small>
              </p>
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      util.printToDom('printComponent', domString);
    })
    .catch((error) => console.error(error));
};

const createEmployeeOnClick = (e) => {
  e.stopImmediatePropagation();
  const newEmployee = {
    name: $('#staff-name').val(),
    position: $('#staff-position').val(),
    employeeImg: $('#staff-photo-url').val(),
    uid: '',
  };
  employeeData.createNewEmployee(newEmployee)
    .then(() => {
      displayStaff();
      $('#createStaffModal').modal('hide');
      $('#staff-name').val('');
      $('#staff-position').val('');
      $('#staff-photo-url').val('');
    })
    .catch((error) => console.error(error));
};

const filterStaffButtonClick = (e) => {
  employeeData.employeesDataByEmployeeId()
    .then((fullStaffs) => {
      const staff = $(e.target).attr('id');
      const employeeArrays = [];
      fullStaffs.forEach((fullStaff) => {
        const formattedPosition = fullStaff.position.replace(/\s/g, '');
        if (formattedPosition === staff) {
          employeeArrays.push(fullStaff);
        }
      });
      if (staff === 'all') {
        displayStaff();
      } else {
        displayStaff(employeeArrays);
      }
    });
};

export default {
  displayStaff,
  deleteEmployeeOnClick,
  filterStaffButtonClick,
  createEmployeeOnClick,
};
