/**
 * Created by paul on 3/21/16.
 */
'use strict';

var Event = require('../models/event');

module.exports = function (app) {
  app.get('/events', function (req, res) {
    Event.find({}).limit(req.query.counts)
      .exec(function (err, events) {
        if (err) {
          res.statsu(500).send('fetch events failed');
        } else {
          res.status(200).send(events);
        }
      });
  });
};
