/**
 * Created by paul on 3/13/16.
 */

/* jshint node:true */
'use strict';
var cheerio = require('cheerio');
var webdriver = require('./bittiger-web-driver');
var By = require('selenium-webdriver').By;
var Event = require('./models/event');
var BITTIGER_HOST_URL = 'http://bittiger.io';

module.exports = BitTigerCrawler;

function BitTigerCrawler() {
  this.driver = webdriver.build();
}

BitTigerCrawler.prototype.crawl = function () {
  this.driver.get('http://bittiger.io/events');
  this.driver.sleep(3000);
  this.driver
    .findElements(By.xpath("(//div[@class='course-desc'])"))
    .then(
      function (elements) {
        elements.forEach(
          function (element) {
            element.getInnerHtml().then(
              function (html) {
                parseBitTigerEvent(html);
              });
            });
      },
      function (err) {
        console.log(err);
      });
  this.driver.sleep(3000);
  this.driver.close();
};

function parseBitTigerEvent(eventHtml) {
  var $ = cheerio.load(eventHtml);
  var title = $('[title]');
  var eventDate = $('strong');
  var content = eventDate.next();

  Event.findOneAndUpdate(
    { link: BITTIGER_HOST_URL + title.attr('href') },
    {
      $set: {
        title: title.text(),
        eventDate: eventDate.text(),
        content: content.text()
      }
    },
    { new: true, upsert: true },
    function (err, event) {
      if (err) {
        console.log(err);
      }
      console.log(event);
    }
  );
}
