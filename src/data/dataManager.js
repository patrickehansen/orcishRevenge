const glob = require('glob');
const path = require('path');

let exporting = {};

glob.sync('src/data/management/*.js', {
  root: __dirname
}).forEach(file => {

  const manager = require(path.join(__dirname, file.slice(8)));

  Object.assign(exporting, manager);
})

module.exports = exporting;