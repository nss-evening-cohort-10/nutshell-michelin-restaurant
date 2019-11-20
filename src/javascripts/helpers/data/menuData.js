import axios from 'axios';
import apiKey from '../apiKeys.json';
import utilities from '../utilities';

const baseUrl = apiKey.firebaseConfig.databaseURL;

const addMenuItem = (newMenuItem) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/menuItems.json`, newMenuItem)
    .then((response) => {
      const newMenuId = response.data;
      resolve(newMenuId.name);
    }).catch((err) => reject(err));
});

const deleteMenuItem = (menuItemId) => axios.delete(`${baseUrl}/menuItems/${menuItemId}.json`);

const getMenuItemById = (menuItemId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/menuItems/${menuItemId}.json`)
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});

const getAllMenuItems = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/menuItems.json`)
    .then((response) => {
      const menuItems = response.data;
      if (menuItems === null) {
        const menuString = `
          <h2 class="whiteh1">Menu</h2>
          <button class="cudButton hide btn btn-secondary m-1"><i class="fas fa-plus cudButton hide whiteh1 cursor">Add Menu Item</i></button>
          <div class="container mx-auto">
          <div class="d-flex flex-wrap flex-row">
          <h1>It looks like you don't have anything on the menu. Consider adding something!</h1>
        `;
        utilities.printToDom('printComponent', menuString);
      } else {
        const menuItemsArr = [];
        Object.keys(menuItems).forEach((fbId) => {
          menuItems[fbId].id = fbId;
          menuItemsArr.push(menuItems[fbId]);
        });
        resolve(menuItemsArr);
      }
    }).catch((err) => reject(err));
});

export default {
  getAllMenuItems,
  deleteMenuItem,
  addMenuItem,
  getMenuItemById,
};
