/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website :  {type: mongoose.Schema.ObjectId, ref: "WebsiteModel",require:true},
    name : {type: String, require:true},
    description: String,
    dateCreated:{type:Date, default: Date.now}
},{collection: "page"});
module.exports = pageSchema;