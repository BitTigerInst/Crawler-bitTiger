/**
 * Created by paul on 3/15/16.
 */
/* eslint-disable no-param-reassign */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema(
  {
    content: {
      type: String
    },
    postDate: {
      type: Date
    },
    images: {
      type: Array
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

postSchema.options.toJSON.transform = function (doc, ret) {
  delete ret.__v;
  delete ret._id;
  delete ret.id;
};

postSchema.virtual('crawledDate')
  .get(function () {
    return this._id.getTimestamp();
  });

module.exports = mongoose.model('Post', postSchema);
