import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

// console log the shit out of this first thing. each line. figure it out. seems more complex than necessary?
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

export default { getSeating };

// Function to:
// pull tableName from db/seatings.json into seatingsData.js
// convert from json into array, export array

// Function to:
// - change input field to dropdown menu
// - generate dropdown selection fields based on table numbers array from seatingsData.js

// *then*
// - function to collect dropdown selection
// and apply it to an axios POST call to add the table number to the reservation data within the database.

// - *then in a separate ticket* make so dynamically only prints tables to dropdown that are not currently assigned to a reservation
