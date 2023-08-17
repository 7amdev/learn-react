export const validator_description = function (value) {
  if (!value) return 'Description is a required field.'; 
  return null;
};

export const validator_quantity = function (value, in_stock) {
  if (value === '0' && in_stock) 
    return 'Quantity must be greater than zero.';
  
  return null;
};

export const validator_price = function (value) {
  const regex = /^[0-9]+(\.[0-9][0-9])$/;
  
  if (parseFloat(value) <= 0) return 'Price must be greather than zero.'; 
  if (!value) return 'Price is a required field.';
  if (!regex.test(value)) return "Insert a valid price format."; 

  return null;
};