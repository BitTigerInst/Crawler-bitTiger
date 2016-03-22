/**
 * Created by paul on 3/6/16.
 */
/* jshint node:true */

'use strict';

var config = {
  MONGO_URL: process.env.MONGO_URL,
  SAUCELABS_USERNAME: process.env.SAUCELABS_USERNAME,
  SAUCELABS_ACCESS_KEY: process.env.SAUCELABS_ACCESS_KEY
};
var key;
for (key in config) {
  if (config.hasOwnProperty(key) && config[key] === undefined) {
    console.log('missing environment variable: ' + key);
    process.exit(1);
  }
}

module.exports = module.exports = config;
