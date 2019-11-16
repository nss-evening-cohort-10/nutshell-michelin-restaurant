import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getReservations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/reservations.json`)
    .then((response) => {
      const demReservations = response.data;
      const reservations = [];
      Object.keys(demReservations).forEach((fbID) => {
        demReservations[fbID].id = fbID;
        reservations.push(demReservations[fbID]);
      });
      console.error('from reservationsData', reservations);
      resolve(reservations);
    })
    .catch((error) => reject(error));
});

export default { getReservations };
