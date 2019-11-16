import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const employeesDataByEmployeeId = (employeeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staffs.json?orderBy="employeeId"&equalTo="${employeeId}"`)
    .then((response) => {
      const demEmployees = response.data;
      const employees = [];
      Object.keys(demEmployees).forEach((emId) => {
        demEmployees[emId].id = emId;
        employees.push(demEmployees[emId]);
      });
      console.log(employees);
      resolve(employees);
    })
    .catch((error) => reject(error));
});

export default { employeesDataByEmployeeId };
