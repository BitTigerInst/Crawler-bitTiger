/**
 * Created by paul on 3/21/16.
 */
var webdriver = require('selenium-webdriver');
var config = require('./config');

module.exports.build = function () {
  return new webdriver.Builder()
    .withCapabilities({
      browserName: 'chrome',
      platform: 'Windows XP',
      version: '43.0',
      username: config.SAUCELABS_USERNAME,
      accessKey: config.SAUCELABS_ACCESS_KEY
    })
    .usingServer('http://' + config.SAUCELABS_USERNAME + ':'
      + config.SAUCELABS_ACCESS_KEY + '@ondemand.saucelabs.com:80/wd/hub')
    .build();
};
