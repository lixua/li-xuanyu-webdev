/**
 * Created by xuanyuli on 6/3/17.
 */
var app = require('../express');
require('./services/user.service.server');
require('./services/page.service.server');
require('./services/website.service.server');
require('./services/widget.service.server');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongod://localhost/webdev_lixuanyu');