/**
 * Created by xuanyuli on 6/12/17.
 */
var mongoose = require('mongoose');
var visitorSchema = mongoose.Schema({
    cart: {type: Array},
    dateCrated: {type: Date, default: Date.now}
}, {collection: "visitor"});

module.exports = visitorSchema;