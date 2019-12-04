import menuData from './menuData';
import menuIngredient from './MenuIngredientData';
import inventoryData from './inventoryData';
import reservationsData from './reservationsData';
import orderData from './orderData';
import seatingData from './seatingData';


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
      const finalMenu = [];
      orderData.getOrdersByReservation(reservationId)
        .then((orders) => {
          console.log('orders', orders);
          if (orders.length <= 0) {
            resolve([]);
          } else {
            orders.forEach((order) => {
              menuData.getMenuItemById(order.menuItemId)
                .then((mmi) => {
                  const nmmi = { ...mmi };
                  nmmi.reservationId = reservation.id;
                  nmmi.seatingId = reservation.seatingId;
                  nmmi.partySize = reservation.partySize;
                  nmmi.customerName = reservation.customerName;
                  nmmi.timeStamp = reservation.timeStamp;
                  nmmi.sectionId = reservation.sectionId;
                  finalMenu.push(nmmi);
                  return finalMenu;
                });
            });
            resolve(finalMenu);
          }
        });
    })
    .catch((error) => reject(error));
});

const getTableByReservationWithResId = (reservationId) => {
  reservationsData.getReservationById(reservationId)
    .then((reservation) => {
      console.log(reservation);
      seatingData.getSeatingById(reservation.seatingId)
        .then((table) => {
          console.log(table);
        });
    })
    .catch((error) => console.error(error));
};

getTableByReservationWithResId('reservation1');

export default { getMenuWithIngredients, getReservationsAndMenuItems };
