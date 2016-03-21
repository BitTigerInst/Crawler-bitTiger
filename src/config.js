/**
 * Created by paul on 3/6/16.
 */
/* jshint node:true */

'use strict';

var config = {
  MONGO_URL: process.env.MONGO_URL
};
var key;
for (key in config) {
  if (config.hasOwnProperty(key) && config[key] === undefined) {
    console.log('missing environment variable: ' + key);
    process.exit(1);
  }
}

module.exports = module.exports = config;
