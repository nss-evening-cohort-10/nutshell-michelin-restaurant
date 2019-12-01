import menuData from './menuData';
import menuIngredient from './MenuIngredientData';
import inventoryData from './inventoryData';
import reservationsData from './reservationsData';
import orderData from './orderData';


const getMenuWithIngredients = () => new Promise((resolve, reject) => {
  menuData.getAllMenuItems()
    .then((menuItems) => {
      menuIngredient.getAllMenuIngredients().then((mIngredients) => {
        inventoryData.getInventory().then((inventory) => {
          const menuDetails = [];
          menuItems.forEach((item) => {
            const newMenuItems = { ...item };
            const matchIngredients = mIngredients.filter((x) => x.menuItemId === newMenuItems.id);
            if (matchIngredients) {
              const matchInventory = [];
              matchIngredients.forEach((match) => {
                const foundIngredient = inventory.find((y) => y.id === match.ingredientId);
                matchInventory.push(foundIngredient);
              });
              newMenuItems.ingredientName = [];
              matchInventory.forEach((ingredientMatch) => {
                newMenuItems.ingredientName.push(ingredientMatch.name);
              });
              const checkInventory = matchInventory.find((z) => z.amountStocked <= 0);
              if (checkInventory || newMenuItems.ingredientName[0] === undefined) {
                newMenuItems.isAvailable = 'Unavailable';
              } else {
                newMenuItems.isAvailable = 'Available';
              }
              menuDetails.push(newMenuItems);
            }
          });
          resolve(menuDetails);
        });
      });
    }).catch((err) => reject(err));
});

const getReservationsAndMenuItems = (reservationId) => new Promise((resolve, reject) => {
  reservationsData.getReservationById(reservationId)
    .then((reservation) => {
      orderData.getOrdersByReservation(reservationId)
        .then((orders) => {
          if (orders.length <= 0) {
            resolve([]);
          } else {
            menuData.getAllMenuItems()
              .then(() => {
                const finalMenu = [];
                let getOrderWithReservation = [];
                getOrderWithReservation = orders.filter((x) => x.reservationId === reservationId);
                if (getOrderWithReservation) {
                  const getMenuId = getOrderWithReservation.map((menuItem) => menuItem.menuItemId);
                  const itemList = [];
                  for (let i = 0; i < getMenuId.length; i += 1) {
                    menuData.getMenuItemById(getMenuId[i]).then((currentItem) => {
                      itemList.push(currentItem[0]);
                      const nmmi = { ...currentItem[0] };
                      nmmi.reservationId = reservation.id;
                      nmmi.seatingId = reservation.seatingId;
                      nmmi.partySize = reservation.partySize;
                      nmmi.customerName = reservation.customerName;
                      nmmi.timeStamp = reservation.timeStamp;
                      nmmi.sectionId = reservation.sectionId;
                      finalMenu.push(nmmi);
                      console.log(itemList);
                    });
                  }
                  resolve(finalMenu);
                  console.log(finalMenu.length);
                }
              });
          }
        });
    })
    .catch((error) => reject(error));
});

export default { getMenuWithIngredients, getReservationsAndMenuItems };
