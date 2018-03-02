'use strict';

const mongoose = require("./../../config/connections");

let Schema = mongoose.Schema;

let user = new Schema({
  fullname: 'string',
  username: 'string',
  password: 'string',
  mobile: 'string',
  created: 'date',
  updated: 'date'
}, {
  collection:'User'
});

module.exports = mongoose.model('User', user);
