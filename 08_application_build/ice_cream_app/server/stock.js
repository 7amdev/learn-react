const stock = [
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
    price: 129,      //   151 / 100 = 1.51
    description: 'Nunc pulvinar suscipit libero in dictum. Class aptent taciti sociosqu ad litora torquent.'
  },
  {
    id: 7, 
    ice_cream_id : 11,
    in_stock: true,
    quantity: 50,
    price: 219,      //   219 / 100 = 1.51
    description: 'Donec volutpat lobortis enim. Sed lobortis est vel diam auctor iaculis. Nunc arcu.'
  },
];


const stock_get = function ({ include_ice_cream, ice_cream_get_by_id_fn }) {
  let results = JSON.parse(JSON.stringify(stock));

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

const stock_get_by_id = function (id, { include_ice_cream, ice_cream_get_by_id_fn }) {
  const result = stock.find(function (stock_item) {
    return stock_item.id === id;
  });
  const result_copy = JSON.parse(JSON.stringify(result));

  if (include_ice_cream && ice_cream_get_by_id_fn) {
    result_copy["ice_cream"] = ice_cream_get_by_id_fn(result_copy.ice_cream_id);
  }

  result_copy.price = result_copy.price / 100;

  return result_copy;
};

const stock_add = function (new_entry) {

  new_entry.id = stock.reduce(function (previous_value, current_value) { 
    return current_value.id > previous_value ? current_value.id : previous_value;
   }, 0) + 1;

  new_entry.price = Math.floor(parseFloat(new_entry.price) * 100)

  stock.push(new_entry);

  return new_entry; 
};

const stock_remove = function (stock_item_id) {
  const item_index = stock.findIndex(function (item) {
    return item.id === parseInt(stock_item_id, 10);
  });

  if (item_index < 0) 
    return [];

  return stock.splice(item_index, 1);
};


module.exports = {
  stock_get,
  stock_get_by_id,
  stock_add,
  stock_remove
};