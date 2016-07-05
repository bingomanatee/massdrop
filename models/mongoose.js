"use strict";

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:28017/massdrop');

module.exports = mongoose;
