const isNonNegativeInteger = (value) => {
  const reg = /^\d+$/;
  return reg.test(value);
};

module.exports = {isNonNegativeInteger}