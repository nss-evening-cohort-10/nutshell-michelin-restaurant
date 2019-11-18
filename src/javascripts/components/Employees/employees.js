import './employees.scss';
import employeeData from '../../helpers/data/employeesData';
import util from '../../helpers/utilities';
import authData from '../../helpers/data/authData';

const displayStaff = () => {
  employeeData.employeesDataByEmployeeId()
    .then((employees) => {
      let domString = `
      <h2 class="whiteh1">Staff</h2>
      <i class="fas fa-plus cudButton hide whiteh1">Add Staff Member</i>
      <div class="container mx-auto">
      <div class="d-flex flex-wrap flex-row">
      `;
      employees.forEach((employee) => {
        domString += `
        <div class="card-deck card-deck-cstm">
          <div class="card">
            <img src="${employee.employeeImg}" alt="picture of ${employee.name}">
            <div class="card-body">
              <h5 class="card-title text-center">${employee.name}</h5>
              <h6 class="card-text text-center">${employee.position}</h6>
              <p class="card-text">
                <small class="text-muted d-flex justify-content-between">
                  <i class="fas fa-pencil-alt cudButton hide cursor"></i>
                  <i class="fas fa-trash-alt cudButton hide cursor"></i>
                </small>
              </p>
            </div>
          </div>
        </div>
        `;
      });
      domString += '</div>';
      util.printToDom('printComponent', domString);
      authData.checkForUser();
    })
    .catch((error) => console.error(error));
};

export default { displayStaff };
