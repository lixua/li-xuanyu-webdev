/**
 * Created by xuanyuli on 6/12/17.
 */
var mongoose = require('mongoose');
var sellerSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, require: true},
    phone: {type: String},
    cardNo: {type: String},
    cardExp: {type: String},
    cardHolder: {type: String},
    billingAddress: {type: String},
    billingCity: {type: String},
    billingState: {type: String},
    billingZipCode: {type: String},
    sellerList:{type:Array},
    buyerList:{type:Array},
    orders:{type: Array},
    items:{type:Array},
    warning: Boolean,
    dateCrated: {type: Date, default: Date.now}
}, {collection: "seller"});

module.exports = sellerSchema;