
const ice_creams = [
  { id:  0, name: 'Stripey Madness'       },
  { id:  1, name: 'Cherry Blast'          },
  { id:  2, name: 'Cookie Tower of Power' },
  { id:  3, name: 'Inverted Stoplight'    },
  { id:  4, name: 'Roswell Crash'         },
  { id:  5, name: 'Artic Rainbow'         },
  { id:  6, name: 'Cbocolate Hat'         },
  { id:  7, name: 'Strawberry Jerry'      },
  { id:  8, name: 'Mint Stack'            },
  { id:  9, name: 'Cookie on a Stick'     },
  { id: 10, name: 'Snowman godfather'     },
  { id: 11, name: 'Choco Mirror Ball'     },
];

const ice_cream_get = function () {
  return ice_creams;
};

const ice_cream_get_by_id = function (id) {
  return ice_creams.find(function (ice_cream) {
    return ice_cream.id === id;
  });
};

const ice_cream_available = function (stock) {

//  Returns all the Ice Creams that is NOT in Stock.
  
  return ice_creams.filter(function (ice_cream) {

    const result = stock.find(function (stock_item) {
      return stock_item.ice_cream_id === ice_cream.id
    });

    return result === undefined;
  });
};

module.exports = {
  ice_cream_get,
  ice_cream_get_by_id,
  ice_cream_available
};