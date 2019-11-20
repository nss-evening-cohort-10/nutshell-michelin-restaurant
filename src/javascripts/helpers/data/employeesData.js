import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';
import utilities from '../utilities';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const employeesDataByEmployeeId = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staffs.json`)
    .then((response) => {
      const demEmployees = response.data;
      if (demEmployees === null) {
        const domString = `
        <h2 class="whiteh1">Staff</h2>
        <div class="d-flex justify-content-between">
        <i class="fas fa-plus cudButton hide whiteh1 cursor">Add Staff Member</i>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Filter Employees
          </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button class="dropdown-item" type="button">All Positions</button>
          <button class="dropdown-item" type="button">Sous Chef</button>
          <button class="dropdown-item" type="button">Executive Sous Chef</button>
          <button class="dropdown-item" type="button">Head Chef</button>
          <button class="dropdown-item" type="button">Pastry Chef</button>
          <button class="dropdown-item" type="button">Chef</button>
          <button class="dropdown-item" type="button">Head Sommelier</button>
          <button class="dropdown-item" type="button">Director of Operations</button>
          <button class="dropdown-item" type="button">Bar Director</button>
          <button class="dropdown-item" type="button">Restaurant Manager</button>
      </div>
      </div>
      </div>
        <div class="container mx-auto">
        <div class="d-flex flex-wrap flex-row">
        <h1>It looks like you don't have any employees. Consider hiring some!</h1>
        `;
        utilities.printToDom('printComponent', domString);
      } else {
        const employees = [];
        Object.keys(demEmployees).forEach((emId) => {
          demEmployees[emId].id = emId;
          employees.push(demEmployees[emId]);
        });
        resolve(employees);
      }
    })
    .catch((error) => reject(error));
});

const deleteEmployeeData = (employeeId) => axios.delete(`${baseUrl}/staffs/${employeeId}.json`);

const createNewEmployee = (newEmployee) => axios.post(`${baseUrl}/staffs.json`, newEmployee);

const updateEmployee = (employeeId, updatedEmployee) => axios.put(`${baseUrl}/staffs/${employeeId}.json`, updatedEmployee);

export default {
  employeesDataByEmployeeId,
  deleteEmployeeData,
  createNewEmployee,
  updateEmployee,
};

// ?orderBy="employeeId"&equalTo="${employeeId}";
