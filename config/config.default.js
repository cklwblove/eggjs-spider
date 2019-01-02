'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545734437912_6837';

  // add your config here
  config.middleware = ['errorHandler'];

  // mongoose
  config.mongoose = {
    url: 'mongodb://localhost:27017/book_shelf',
    options: {
      keepAlive: true,
      reconnectTries: Number.MAX_VALUE,
      poolSize: 20
    }
  };

  // cors
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // csrf
  config.security = {
    csrf: false
  };

  return config;
};
