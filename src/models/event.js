/**
 * Created by paul on 3/20/16.
 */
/* eslint-disable no-param-reassign */
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
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

eventSchema.options.toJSON.transform = function (doc, ret) {
  delete ret.__v;
  delete ret._id;
  delete ret.id;
};

eventSchema.virtual('crawledDate')
  .get(function () {
    return this._id.getTimestamp();
  });


module.exports = mongoose.model('Event', eventSchema);
