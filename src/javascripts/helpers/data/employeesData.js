import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const employeesDataByEmployeeId = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staffs.json`)
    .then((response) => {
      const demEmployees = response.data;
      const employees = [];
      Object.keys(demEmployees).forEach((emId) => {
        demEmployees[emId].id = emId;
        employees.push(demEmployees[emId]);
      });
      resolve(employees);
    })
    .catch((error) => reject(error));
});

export default { employeesDataByEmployeeId };

// ?orderBy="employeeId"&equalTo="${employeeId}";
