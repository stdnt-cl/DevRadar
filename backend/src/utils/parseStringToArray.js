module.exports = function parseStringToArray(stringAsArray) {
  return stringAsArray.split(',').map(tech => tech.trim());
}
