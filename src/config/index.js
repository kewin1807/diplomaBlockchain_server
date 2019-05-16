export default {
  app: {
    port: process.env.DEV_APP_PORT || 8080,
    appName: process.env.APP_NAME || 'Diploma',
    env: process.env.NODE_ENV || 'development'
  },
  multichain: {
    port: '2768',
    host: 'localhost',
    user: 'multichainrpc',
    pass: '4eeVsuDnSn2sUvnHCiVS9Cr7N6XUoawgytb1hZEDLpFR',
  }
};
