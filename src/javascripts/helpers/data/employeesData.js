import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';
import utilities from '../utilities';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const employeesDataByEmployeeId = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staffs.json`)
    .then((response) => {
      const demEmployees = response.data;
      let employees = [];
      if (demEmployees === null) {
        const domString = `
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
            <button class="dropdown-item filterStaffButton" type="button" id="HeadofWaitStaff">Head of Wait Staff</button>
          </div>
          </div>
            <button class="btn btn-secondary cudButton hide cudButton hide whiteh1 cursor" data-toggle="modal" data-target="#createStaffModal"><i class="fas fa-plus"></i> Add Staff Member</button>
        </div>
        </div>
        <div class="container mx-auto">
        <div class="d-flex flex-wrap flex-row">
        <h1>It looks like you don't have any employees. Consider hiring some!</h1>
        `;
        employees = [];
        utilities.printToDom('printComponent', domString);
      } else {
        Object.keys(demEmployees).forEach((emId) => {
          demEmployees[emId].id = emId;
          employees.push(demEmployees[emId]);
        });
        resolve(employees);
      }
    })
    .catch((error) => reject(error));
});

const getStaffById = (employeeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staffs/${employeeId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const deleteEmployeeData = (employeeId) => axios.delete(`${baseUrl}/staffs/${employeeId}.json`);

const createNewEmployee = (newEmployee) => axios.post(`${baseUrl}/staffs.json`, newEmployee);

const updateEmployee = (employeeId, updatedEmployee) => axios.put(`${baseUrl}/staffs/${employeeId}.json`, updatedEmployee);

export default {
  employeesDataByEmployeeId,
  getStaffById,
  deleteEmployeeData,
  createNewEmployee,
  updateEmployee,
};

// ?orderBy="employeeId"&equalTo="${employeeId}";
