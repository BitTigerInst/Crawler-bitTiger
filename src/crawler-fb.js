/**
 * Created by paul on 3/20/16.
 */
var _ = require('lodash');
var cheerio = require('cheerio');
var webdriver = require('./bittiger-web-driver');
var By = require('selenium-webdriver').By;
var Post = require('./models/post');

module.exports = FbCrawler;

function FbCrawler() {
  this.driver = webdriver.build();
}

FbCrawler.prototype.crawl = function (fbPageName) {
  this.driver.get('https://www.facebook.com/' + fbPageName);
  this.driver.sleep(3000);
  this.driver
    .findElements(By.xpath("//div[@role='article']"))
    .then(
      function (elements) {
        elements.forEach(
          function (element) {
            element.getInnerHtml()
              .then(
                function (html) {
                  parseFbPost(html);
                });
          });
      },
      function (err) {
        console.log(err);
      });
    this.driver.sleep(3000);
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
