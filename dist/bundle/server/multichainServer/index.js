'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _multichainNode = require('multichain-node');

var _multichainNode2 = _interopRequireDefault(_multichainNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var multichainNode = (0, _multichainNode2.default)(_config2.default.multichain);
exports.default = multichainNode;