/**
 * Created by paul on 3/21/16.
 */
'use strict';
var express = require('express');
var timeout = require('connect-timeout');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var port = process.env.PORT || 3000;
mongoose.connect(config.MONGO_URL);

app.use(timeout(60000));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

require('./routes/eventRouter')(app);
require('./routes/postRouter')(app);
app.listen(port, function () {
  console.log('the server is listening at port: ' + port);
});
