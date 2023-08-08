const menu = [
  {
    id: 1, 
    ice_cream_id: 1,
    in_stock: true,
    quantity: 20,
    price: 151,      //   151 / 100 = 1.51
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum convallis sapien quis.'
  },
  {
    id: 2, 
    ice_cream_id: 8,
    in_stock: true,
    quantity: 30,
    price: 164,      //   164 / 100 = 1.51
    description: 'Praesent ut lectus imperdiet, posuere orci ac, interdum augue. Vestibulum aliquet mollis dui.'
  },
  {
    id: 3, 
    ice_cream_id: 10,
    in_stock: true,
    quantity: 30,
    price: 150,      //   151 / 100 = 1.51
    description: 'Donec tincidunt augue congue leo egestas mattis. Phasellus sollicitudin semper dolor, at aliquet.'
  },
  {
    id: 4, 
    ice_cream_id: 4,
    in_stock: true,
    quantity: 10,
    price: 182,      //   151 / 100 = 1.51
    description: 'Nullam id aliquet nisl. Maecenas euismod sagittis augue, sit amet aliquet turpis faucibus.'
  },
  {
    id: 5, 
    ice_cream_id: 7,
    in_stock: false,
    quantity: 0,
    price: 298,      //   151 / 100 = 1.51
    description: 'Maecenas sed consectetur arcu. Vestibulum vulputate turpis faucibus tellus tristique, non condimentum nibh.'
  },
  {
    id: 6, 
    ice_cream_id : 2,
    in_stock: true,
    quantity: 11,
    price: 129,      //   129 / 100 = 1.29
    description: 'Nunc pulvinar suscipit libero in dictum. Class aptent taciti sociosqu ad litora torquent.'
  },
  {
    id: 7, 
    ice_cream_id : 11,
    in_stock: true,
    quantity: 50,
    price: 219,      //   219 / 100 = 2.19
    description: 'Donec volutpat lobortis enim. Sed lobortis est vel diam auctor iaculis. Nunc arcu.'
  },
];

// Todo
// [] return error object
// [] implement filter - {price, name} = req.query
const menu_get = function ({ include_ice_cream, ice_cream_get_by_id_fn }) {
  let results = structuredClone(menu); // JSON.parse(JSON.stringify(stock));

  if (include_ice_cream && ice_cream_get_by_id_fn) {
    for (let i = 0; i < results.length; i++) {
      results[i]["ice_cream"] = ice_cream_get_by_id_fn(results[i].ice_cream_id);
      results[i].price = results[i].price / 100;
    }

    return results;
  }

  for (let i = 0; i < results.length; i++) {
    results[i].price = results[i].price / 100;
  }

  return results;
};

const menu_get_by_id = function (id, { include_ice_cream, ice_cream_get_by_id_fn }) {
  const result = menu.find(function (menu_item) {
    return menu_item.id === id;
  });

  if (!result) return { error: 'Menu Item not found.' };

  const result_copy = structuredClone(result);   // JSON.parse(JSON.stringify(result));

  if (include_ice_cream && ice_cream_get_by_id_fn) {
    result_copy["ice_cream"] = ice_cream_get_by_id_fn(result_copy.ice_cream_id);
  }

  result_copy.price = result_copy.price / 100;

  return result_copy;
};

const menu_add = function (new_entry) {

  new_entry.id = menu.reduce(function (previous_value, current_value) { 
    return current_value.id > previous_value ? current_value.id : previous_value;
   }, 0) + 1;

  new_entry.price = Math.floor(parseFloat(new_entry.price) * 100)

  menu.push(new_entry);

  return new_entry; 
};

const menu_update = function (id, data) {
  const {
    in_stock, 
    price, 
    quantity, 
    description
  } = data;    

  const index = menu.findIndex(function (menu_item) {
    return menu_item.id === id;
  });

  if (index === -1) {
    return { error: "Menu Item not found." };
  }

  const menu_item_old = menu[index];

  menu[index] = {
    ...menu[index],
    in_stock,
    price: price * 100,
    quantity,
    description
  };

  return { before: menu_item_old, after: menu[index] };
}

const menu_remove = function (menu_item_id) {
  const item_index = menu.findIndex(function (item) {
    return item.id === parseInt(menu_item_id, 10);
  });

  if (item_index < 0) 
    return { error: 'Menu item not found.' };

  const [removed_item] = menu.splice(item_index, 1);
  return removed_item;
};

const menu_map_field_ice_cream_id = function () {
  return menu.map(function (menu_item) {
    return menu_item.ice_cream_id;
  });
};

module.exports = {
  menu_get,
  menu_get_by_id,
  menu_add,
  menu_update,
  menu_remove,
  menu_map_field_ice_cream_id
};