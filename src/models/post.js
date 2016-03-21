/**
 * Created by paul on 3/15/16.
 */
/* jshint node: true */
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
  }
);

module.exports = mongoose.model('Post', postSchema);
