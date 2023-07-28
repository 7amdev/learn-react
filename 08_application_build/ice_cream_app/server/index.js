const express = require('express');
const bodyParser = require('body-parser');

const { 
  ice_cream_available, 
  ice_cream_get_by_id, 
  ice_cream_get 
} = require('./ice_cream');
const { 
  stock_get, 
  stock_add, 
  stock_update,
  stock_remove, 
  stock_get_by_id
} = require('./stock');

const PORT = 5000;
const STOCK_INCLUDE = {
  ICE_CREAMS: "ice-creams"
};
const app = express();

const key_value_map_converter = function (value_string) {
  if (!value_string) return {};

  return ( 
    value_string
      .split(',')
      .reduce(
        function (previous_value, current_value) {
          return {
            ...previous_value,
            [current_value]: current_value
          };
        }, 
        {}
      )
  );
};

app.use(bodyParser.json());

app.get('/api/ice-creams', function (req, res) {
  res.send(ice_cream_get());  
});

// Order matters: /api/ice-creams/available MUST be defined
// before /api/ice-creams/:id

app.get('/api/ice-creams/available', function (req, res) {
  res.send(ice_cream_available(stock_get({})));  
});

app.get('/api/ice-creams/:id', function (req, res) {
  const result = ice_cream_get().find(function (ice_cream) {
    return ice_cream.id === parseInt(req.params.id);
  });

  if (!result) {
    res.status(404).json({error: "Ice cream not found"});
    return;
  } 
  
  res.send(result);  
});

app.get('/api/stock', function (req, res) {
  const { include }   = req.query;  
  const include_enum  = key_value_map_converter(include);
  let options         = {};

  if (include_enum && include_enum[STOCK_INCLUDE.ICE_CREAMS]) {
    options.include_ice_cream       = true;
    options.ice_cream_get_by_id_fn  = ice_cream_get_by_id;
  } 

  const result = stock_get(options);

  if (!result) {
    return res.status(500).json({error: "An error occurs processing your request"});
  } 

  res.send(result);  
});

app.get('/api/stock/:id', function (req, res) {
  const { include }   = req.query;
  const { id }        = req.params;
  const include_enum  = key_value_map_converter(include);
  let options         = {};
   
  if (include_enum && include_enum[STOCK_INCLUDE.ICE_CREAMS]) {
    options.include_ice_cream      = true;
    options.ice_cream_get_by_id_fn = ice_cream_get_by_id; // COMPOSITION
  } 

  const result = stock_get_by_id(parseInt(id, 10), options);
  
  if (result.error) {
    res.status(404);  
  } 

  res.send(result);  
});

app.post('/api/stock', function (req, res) {
  const new_entry  = req.body;
  const stock_item = stock_add(new_entry);

  if (!stock_item) {
    return res.status(500).json({ error: "Server error: Cannot create a anew entry" });
  }

  res.send(stock_item);
});

app.put('/api/stock/:id', function (req, res) {
  const { id }  = req.params;
  const payload = req.body;

  const result = stock_update(parseInt(id, 10), payload);

  if (result.error) res.status(404); 

  res.send(result);
});

app.delete('/api/stock/:id', function (req, res) {
  stock_remove(req.params.id);

  res.status(204).send();
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});