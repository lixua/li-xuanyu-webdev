/**
 * Created by xuanyuli on 6/12/17.
 */

var mongoose = require('mongoose');
var buyerSchema = require('./buyer.schema.server');

var buyerModel = mongoose.model('buyerModel', buyerSchema);

buyerModel.createBuyer = createBuyer;
buyerModel.findBuyerById = findBuyerById;
buyerModel.findBuyerByCredentials = findBuyerByCredentials;
buyerModel.deleteBuyer =deleteBuyer;
buyerModel.updateBuyer = updateBuyer;
buyerModel.findBuyerByName =findBuyerByName;
buyerModel.addseller = addseller;
buyerModel.removeseller = removeseller;
buyerModel.addbuyer = addbuyer;
buyerModel.removebuyer = removebuyer;

module.exports = buyerModel;
function addseller(buyerid,sellerid){
    return buyerModel.update({_id:buyerid},{$push:{sellerList:sellerid}})
}
function removeseller(buyerid, sellerid){
    return buyerModel.update({_id:buyerid},{$pull:{sellerList:sellerid}})
}

function addbuyer(buyer1id,buyer2id){
    return buyerModel.update({_id:buyer1id},{$push:{buyerList:buyer2id}})
}
function removebuyer(buyer1id, buyer2id){
    return buyerModel.update({_id:buyer1id},{$pull:{buyerList:buyer2id}})
}
function findBuyerByName(name){
    return buyerModel.findOne({username:name});
}
function updateBuyer(buyerId, buyer){
    return buyerModel.update({_id: buyerId},{$set: buyer});
}

function deleteBuyer(buyerId){
    return buyerModel.remove({_id:buyerId});
}
function findBuyerByCredentials(username, password){
    return buyerModel.findOne({username:username, password:password});
}

function createBuyer(buyer) {
    return buyerModel.create(buyer);
}

function findBuyerById(buyerId){
    return buyerModel.findById(buyerId);
}
