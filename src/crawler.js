/**
 * Created by paul on 2/5/16.
 */
/* jshint node:true */
'use strict';
var config = require('./config');
var mongoose = require('mongoose');
var FbCrawler = require('./crawler-fb');
var BitTigerCrawler = require('./crawler-bitTiger');
var GithubActivityFetcher = require('./fetcher-github');

var CRAWL_INTERVAL = 1000 * 60 * 60 * 6;
mongoose.connect(config.MONGO_URL);

(new FbCrawler()).crawl('bittiger.io');
(new BitTigerCrawler).crawl();
(new GithubActivityFetcher).fetch();

setInterval(function () {
  (new FbCrawler()).crawl('bittiger.io');
  (new BitTigerCrawler).crawl();
  (new GithubActivityFetcher).fetch();
}, CRAWL_INTERVAL);
