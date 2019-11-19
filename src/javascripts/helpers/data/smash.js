import menu from './menuData';
import menuIngredient from './MenuIngredientData';
import inventoryData from './inventoryData';

const getMenuWithIngredients = () => new Promise((resolve, reject) => {
  menu.getAllMenuItems()
    .then((menuItems) => {
      menuIngredient.getAllMenuIngredients().then((mIngredients) => {
        inventoryData.getInventory().then((inventory) => {
          const menuDetails = [];
          menuItems.forEach((item) => {
            const newMenuItems = { ...item };
            const matchIngredients = mIngredients.filter((x) => x.menuItemId === newMenuItems.id);
            console.log('match ing', matchIngredients);
            if (matchIngredients) {
              // find inventory match & check amountStocked
              // if amountStocked < 1, push isAvailaible = false, else true
              const matchInventory = inventory.filter((y) => y.id === matchIngredients.ingredientId);
              console.log('inv name', matchInventory);
              newMenuItems.ingredientName = [];
              matchInventory.forEach((ingredientMatch) => {

                newMenuItems.ingredientName.push(ingredientMatch.name);
              });
              console.log('post ing name push', newMenuItems);
              const checkInventory = inventory.find((z) => z.amountStocked < 1);
              if (checkInventory) {
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

export default { getMenuWithIngredients };
