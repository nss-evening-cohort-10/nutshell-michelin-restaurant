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

const getReservationsAndMenuItems = () => new Promise((resolve, reject) => {
  reservationsData.getReservations()
    .then((reservations) => {
      orderData.getOrders()
        .then((orders) => {
          menuData.getAllMenuItems()
            .then((menuItems) => {
              console.log('men', menuItems);
              reservations.forEach((reservation) => {
                orders.forEach((order) => {
                  menuItems.forEach((menuItem) => {
                    if (reservation.id === order.reservationId) {
                      if (order.menuItemId === menuItem.id) {
                        const newReservation = { ...reservation };
                        newReservation.menu = menuItem;
                        console.log(newReservation);
                      }
                    }
                  });
                });
              });
            });
        });
    })
    .catch((error) => reject(error));
});

getReservationsAndMenuItems();

export default { getMenuWithIngredients, getReservationsAndMenuItems };
