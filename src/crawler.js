/**
 * Created by paul on 2/5/16.
 */
/* jshint node:true */
'use strict';
var config = require('./config');
var mongoose = require('mongoose');
var FbCrawler = require('./crawler-fb');
var BitTigerCrawler = require('./crawler-bitTiger');
var fbCrawler = new FbCrawler();
var bitTigerCrawler = new BitTigerCrawler();
var CRAWL_INTERVAL = 1000 * 60 * 60 * 6;
mongoose.connect(config.MONGO_URL);

setInterval(function () {
  fbCrawler.crawl('bittiger.io');
  bitTigerCrawler.crawl();
}, CRAWL_INTERVAL);
