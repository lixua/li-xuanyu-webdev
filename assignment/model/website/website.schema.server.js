/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
   _user :  {type: mongoose.Schema.ObjectId, ref: "UserModel",require:true},
   name : {type: String, require: true},
    description: String,
    dateCreated:{type:Date, default: Date.now}
},{collection: "website"});
module.exports = websiteSchema;