/**
 * Checks whether a string is valid
 * @param {string} value - string that is for validate
 * @param {object} rules - validation rules (is require and validation regex)
 * @return {boolean} isValid - is value valid
 */
export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.regexPattern) {
    isValid = rules.regexPattern.test(value) && isValid;
  }

  return isValid;
};
