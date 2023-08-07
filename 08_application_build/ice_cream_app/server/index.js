const express = require('express');
const bodyParser = require('body-parser');

const { 
  ice_cream_available, 
  ice_cream_get_by_id, 
  ice_cream_get 
} = require('./ice_cream');
const { 
  menu_get, 
  menu_add, 
  menu_update,
  menu_remove, 
  menu_get_by_id
} = require('./menu');

const PORT = 5000;
const MENU_INCLUDE = {
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
  res.send(ice_cream_available(menu_get({})));  
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

app.get('/api/menu', function (req, res) {
  const { include }   = req.query;  
  const include_enum  = key_value_map_converter(include);
  let options         = {};

  if (include_enum && include_enum[MENU_INCLUDE.ICE_CREAMS]) {
    options.include_ice_cream       = true;
    options.ice_cream_get_by_id_fn  = ice_cream_get_by_id;
  } 

  const result = menu_get(options);

  if (!result) {
    return res.status(500).json({error: "An error occurs processing your request"});
  } 

  res.send(result);  
});

app.get('/api/menu/:id', function (req, res) {
  const { include }   = req.query;
  const { id }        = req.params;
  const include_enum  = key_value_map_converter(include);
  let options         = {};
   
  // todo
  // [] change include_enum
  // [] redo key_value_map_converter
  //    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

  if (include_enum && include_enum[MENU_INCLUDE.ICE_CREAMS]) {
    options.include_ice_cream      = true;
    options.ice_cream_get_by_id_fn = ice_cream_get_by_id; // COMPOSITION
  } 

  const result = menu_get_by_id(parseInt(id, 10), options);
  
  if (result.error) {
    res.status(404);  
  } 

  res.send(result);  
});

app.post('/api/menu', function (req, res) {
  const new_entry  = req.body;
  const menu_item = menu_add(new_entry);

  if (!menu_item) {
    return res.status(500).json({ error: "Server error: Cannot create a anew entry" });
  }

  res.send(menu_item);
});

app.put('/api/menu/:id', function (req, res) {
  const { id }  = req.params;
  const payload = req.body;

  const result = menu_update(parseInt(id, 10), payload);

  if (result.error) res.status(404); 

  res.send(result);
});

app.delete('/api/menu/:id', function (req, res) {
  const result = menu_remove(req.params.id);

  if (result.error) res.status(500);

  res.send(result);
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});