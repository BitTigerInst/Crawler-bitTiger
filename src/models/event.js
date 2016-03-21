/**
 * Created by paul on 3/20/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String
    },
    eventDate: {
      type: String
    },
    link: {
      type: String
    }
  }
);

module.exports = mongoose.model('Event', eventSchema);
