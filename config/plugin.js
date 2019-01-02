'use strict';

// had enabled by egg
// exports.static = true;

// validate
exports.validate = {
  enable: true,
  package: 'egg-validate'
};

// mongoose
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose'
};

// cors
exports.cors = {
  enable: true,
  package: 'egg-cors'
};
