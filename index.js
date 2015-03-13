var fis = module.exports = require('fis');

fis.cli.name = 'fis-zoo';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

console.log(1);