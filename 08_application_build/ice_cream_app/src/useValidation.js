import { useState, useEffect } from "react";

const useValidation = function ({  
  value, 
  validator_fn, 
  compare_value = null,
  is_required,
  error_id,
  show_error = false
}) {
  const [error, set_error] = useState(null);

  useEffect(function () {
    const result = validator_fn(value, compare_value);
    set_error(result);
  }, [value, validator_fn, compare_value]);

  return [error, {
    'aria-describedby': (show_error && error) ? error_id : null,
    'aria-invalid': (show_error && error) ? 'true' : 'false',
    'aria-required': is_required ? 'true' : null,
    required: is_required
  }];
};

export default useValidation;