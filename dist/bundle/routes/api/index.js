'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _generateKey = require('./generateKey');

var _generateKey2 = _interopRequireDefault(_generateKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use('/key', _generateKey2.default);

exports.default = router;