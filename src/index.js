import './css/style.styl'
import './js/threegest.js'

var generator = require('generate-maze');
var maze = generator(3);
console.log(maze)