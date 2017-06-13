/**
 * Created by xuanyuli on 6/12/17.
 */
var mongoose = require('mongoose');
var buyerSchema = mongoose.Schema({
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
    mailingAddress: {type: String},
    mailingCity: {type: String},
    mailingState: {type: String},
    mailingZipCode: {type: String},
    mailingFirstName: {type: String},
    mailingLastName:{type: String},
    sellerList:{type:Array},
    buyerList:{type:Array},
    orders:{type: Array},
    cart:{type: Array},
    warning: Boolean,
    dateCrated: {type: Date, default: Date.now}
}, {collection: "buyer"});

module.exports = buyerSchema;