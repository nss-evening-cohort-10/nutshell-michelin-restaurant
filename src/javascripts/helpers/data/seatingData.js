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
      const sortedTables = tables.sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
      resolve(sortedTables);
    })
    .catch((error) => reject(error));
});

const getSeatingByTableId = (tableId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/seatings/${tableId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

export default { getSeating, getSeatingByTableId };
