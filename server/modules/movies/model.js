/**
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * Create the database schema
 */

var MovieSchema = new Schema({
  name: {
    type: String,
    default: ''
  },

  synopsis: {
    type: String,
    default: ''
  },

  genre: {
    type: String,
    default: ''
  },

  duration: {
    type: String,
    default: ''
  },

  director: {
    type: String,
    default: ''
  },

  studio: {
    type: String,
    default: ''
  },

  is: {
    type: Boolean,
    default: false
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date,
    default: Date.now
  }
});

/**
 * Expose the database model
 */

module.exports = mongoose.model('Movie', MovieSchema);
