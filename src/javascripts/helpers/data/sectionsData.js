import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getSections = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sections.json`)
    .then((response) => {
      const demSections = response.data;
      const sections = [];
      Object.keys(demSections).forEach((fbId) => {
        demSections[fbId].id = fbId;
        sections.push(demSections[fbId]);
      });
      resolve(sections);
    })
    .catch((error) => reject(error));
});

export default { getSections };
