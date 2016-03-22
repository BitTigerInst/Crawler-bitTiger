/**
 * Created by paul on 3/21/16.
 */
var Event = require('../models/post');

module.exports = function (app) {
  app.get('/posts', function (req, res) {
    Event.find({}).limit(req.query.counts)
      .exec(function (err, posts) {
        if (err) {
          res.statsu(500).send('fetch events failed');
        } else {
          res.status(200).send(posts);
        }
      });
  });
};
