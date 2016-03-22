/**
 * Created by paul on 3/20/16.
 */
var _ = require('lodash');
var cheerio = require('cheerio');
var webdriver = require('selenium-webdriver');

// var chrome = require('selenium-webdriver/chrome');
// var path = require('chromedriver').path;
var By = require('selenium-webdriver').By;
var Post = require('./models/post');

// var service = new chrome.ServiceBuilder(path).build();
// chrome.setDefaultService(service);

var username = 'yuqinlear';
var accessKey = '901a39b0-cd83-4d73-b08a-a3d20f0ba104';

module.exports = FbCrawler;

function FbCrawler() {
  this.driver = new webdriver.Builder()
    .withCapabilities({
      browserName: 'chrome',
      platform: 'Windows XP',
      version: '43.0',
      username: username,
      accessKey: accessKey
    })
    .usingServer('http://' + username + ':' + accessKey + '@ondemand.saucelabs.com:80/wd/hub')
    .build();
}

FbCrawler.prototype.crawl = function (fbPageName) {
  this.driver.get('https://www.facebook.com/' + fbPageName);
  this.driver.sleep(3000);
  this.driver
    .findElements(By.xpath("//div[@role='article']"))
    .then(
    function (elements) {
      elements.forEach(function (element) {
        element.getInnerHtml().then(
          function (html) {
            parseFbPost(html);
          }
        );
      });
    }, function (err) {
      console.log(err);
    }
  );
  this.driver.quit();
};

function parseFbPost(eventHtml) {
  var $ = cheerio.load(eventHtml);
  var createdTimeElem = $('abbr');
  var contentElem = $('.userContent');
  var imageElems = $('.uiScaledImageContainer > img');
  var images = _.map(imageElems, function (imageElem) {
    return imageElem.attribs.src;
  });

  var utcSeconds = createdTimeElem.attr('data-utime');
  var date = new Date(0);
  date.setUTCSeconds(utcSeconds);
  Post.findOneAndUpdate(
    { postDate: date },
    {
      $set: {
        content: contentElem.text(),
        images: images
      }
    },
    { new: true, upsert: true },
    function (err, post) {
      if (err) {
        console.log(err);
      }
      console.log(post);
    }
  );
}
