import axios from 'axios';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;

const addMenuItem = (newMenuItem) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/menuItems.json`, newMenuItem)
    .then((response) => {
      const newMenuId = response.data;
      resolve(newMenuId.name);
    }).catch((err) => reject(err));
});

const getAllMenuItems = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/menuItems.json`)
    .then((response) => {
      const menuItems = response.data;
      const menuItemsArr = [];
      Object.keys(menuItems).forEach((fbId) => {
        menuItems[fbId].id = fbId;
        menuItemsArr.push(menuItems[fbId]);
      });
      resolve(menuItemsArr);
    }).catch((err) => reject(err));
});

export default { getAllMenuItems, addMenuItem };
