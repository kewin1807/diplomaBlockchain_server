'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crypticoJs = require('cryptico-js');

var _crypticoJs2 = _interopRequireDefault(_crypticoJs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ipfsHttpClient = require('ipfs-http-client');

var _ipfsHttpClient2 = _interopRequireDefault(_ipfsHttpClient);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();

router.get('/getKey', function(req, res, next) {
  var PassPhrase = 'The Moon is a Harsh Mistress.';
  var Bits = 1024;
  var MattsRSAkey = _crypticoJs2.default.generateRSAKey(PassPhrase, Bits);
  res.send({
    publicKey: _crypticoJs2.default.publicKeyString(MattsRSAkey)
  });
});

router.get('/getFile', function(req, res, next) {
  var testFile = _fs2.default.readFileSync(
    '/Users/tienthanh/Desktop/Phân-tích-các-use-case.docx'
  );
  var testBuffer = Buffer.from(testFile);
  var ipfs = (0, _ipfsHttpClient2.default)({
    host: 'localhost',
    port: '5001',
    protocol: 'http'
  });
  ipfs.add(testBuffer, function(err, info) {
    //if(err || !res) return console.error(err)
    if (!err) {
      console.log(info);
      console.log(info.path);
      console.log(info.hash);
      res.send(info);
    } else {
      res.send(err);
      console.log(info);
    }
  });
});

exports.default = router;
