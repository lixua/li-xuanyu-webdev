/**
 * Created by xuanyuli on 6/12/17.
 */
var mongoose = require('mongoose');
var adminSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    phone: {type: String, require: true},
    Address: {type: String, require: true},
    City: {type: String, require: true},
    State: {type: String, require: true},
    ZipCode: {type: String, require: true},
    dateCrated: {type: Date, default: Date.now}
}, {collection: "admin"});

module.exports = adminSchema;