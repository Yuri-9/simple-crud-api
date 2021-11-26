const validateObject = (obj, schema) => {
  const resultNotExistRequired = [];
  const resultUncorrectedType = [];
  Object.keys(schema).forEach((key) => {
    if (schema[key].required && !obj.hasOwnProperty(key)) {
      resultNotExistRequired.push(key);
    }
    if (obj[key] && Array.isArray(schema[key].type)) {
      if (obj.hasOwnProperty(key) && !Array.isArray(obj[key])) {
        resultUncorrectedType.push(key);
      } else if (!obj[key].every((item) => typeof item === schema[key].type[0])) {
        resultUncorrectedType.push(key);
      }
    } else if (obj.hasOwnProperty(key) && schema[key].type !== typeof obj[key]) {
      resultUncorrectedType.push(key);
    }
  });

  const isValidate = !(resultNotExistRequired.length || resultUncorrectedType.length);

  const resultValidate = {
    notExistRequired: resultNotExistRequired.join(', '),
    uncorrectedType: resultUncorrectedType.join(', '),
  };

  return {
    isValidate,
    resultValidate,
  };
};

module.exports = validateObject;
