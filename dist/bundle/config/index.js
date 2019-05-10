'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
    appName: process.env.APP_NAME || 'Diploma',
    env: process.env.NODE_ENV || 'development'
  },
  multichain: {
    port: '',
    host: 'localhost',
    user: 'multichainrpc',
    pass: ''
  }
};