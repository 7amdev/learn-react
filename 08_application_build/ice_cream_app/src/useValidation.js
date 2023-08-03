import { useState, useEffect } from "react";

const useValidation = function (value, validator_fn, compare_value) {
  const [error, set_error] = useState(null);

  useEffect(function () {
    const result = validator_fn(value, compare_value);
    set_error(result);
  }, [value, validator_fn, compare_value]);

  return error;
};

export default useValidation;