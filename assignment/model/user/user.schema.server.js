/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    dateCrated: {type: Date, default: Date.now},
    facebook:{
        id: String,
        token: String
    }
}, {collection: "user"});

module.exports = userSchema;