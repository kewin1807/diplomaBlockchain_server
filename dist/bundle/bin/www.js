'use strict';

var _app = require('../server/app');

var _app2 = _interopRequireDefault(_app);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require('http');

require('babel-core/register');
require('babel-polyfill');
var server = http.createServer(_app2.default);

server.listen(_config2.default.app.port, function () {
  (function () {
    return console.log('Example app listening on port 3000!');
  });
});