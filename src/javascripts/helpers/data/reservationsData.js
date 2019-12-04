import axios from 'axios';
import moment from 'moment';
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
      const sortedReservations = reservations.sort((a, b) => moment(a.timeStamp).unix() - moment(b.timeStamp).unix());
      resolve(sortedReservations);
    })
    .catch((error) => reject(error));
});

const getReservationById = (reservationId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/reservations/${reservationId}.json`)
    .then((response) => {
      const reservation = response.data;
      reservation.id = reservationId;
      resolve(reservation);
    })
    .catch((error) => reject(error));
});

const deleteReservation = (reservationId) => axios.delete(`${baseUrl}/reservations/${reservationId}.json`);
const addReservation = (newReservation) => axios.post(`${baseUrl}/reservations.json`, newReservation);

const updateReservation = (reservationId, updatedReservation) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/reservations/${reservationId}.json`, updatedReservation)
    .then((response) => {
      const updReservation = response.data;
      updReservation.id = reservationId;
      resolve(updReservation);
    })
    .catch((error) => reject(error));
});

export default {
  getReservations,
  getReservationById,
  deleteReservation,
  updateReservation,
  addReservation,
};
