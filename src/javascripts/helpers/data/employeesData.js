import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';
import utilities from '../utilities';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const employeesDataByEmployeeId = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staffs.json`)
    .then((response) => {
      console.log('this is response', response);
      const demEmployees = response.data;
      if (demEmployees === null) {
        const domString = `
        <h2 class="whiteh1">Staff</h2>
        <i class="fas fa-plus cudButton hide whiteh1 cursor">Add Staff Member</i>
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
        console.log('this is employees array', employees);
        resolve(employees);
      }
    })
    .catch((error) => reject(error));
});

const deleteEmployeeData = (employeeId) => axios.delete(`${baseUrl}/staffs/${employeeId}.json`);

export default { employeesDataByEmployeeId, deleteEmployeeData };

// ?orderBy="employeeId"&equalTo="${employeeId}";
