import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getSeating = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/seatings.json`)
    .then((response) => {
      const demTables = response.data;
      const tables = [];
      Object.keys(demTables).forEach((fbId) => {
        demTables[fbId].id = fbId;
        tables.push(demTables[fbId]);
      });
      resolve(tables);
    })
    .catch((error) => reject(error));
});

export default { getSeating };
