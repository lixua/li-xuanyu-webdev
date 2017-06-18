/**
 * Created by xuanyuli on 6/12/17.
 */
/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var sellerSchema = require('./seller.schema.server');

var sellerModel = mongoose.model('sellerModel', sellerSchema);

sellerModel.createseller = createseller;
sellerModel.findsellerById = findsellerById;
sellerModel.findsellerByCredentials = findsellerByCredentials;
sellerModel.deleteseller =deleteseller;
sellerModel.updateseller = updateseller;
sellerModel.findsellerByName =findsellerByName;
sellerModel.addseller = addseller;
sellerModel.removeseller = removeseller;
sellerModel.addbuyer = addbuyer;
sellerModel.removebuyer = removebuyer;



module.exports = sellerModel;
function addseller(seller1id,seller2id){
    return sellerModel.update({_id:seller1id},{$push:{sellerList:seller2id}})
}
function removeseller(seller1id, seller2id){
    return sellerModel.update({_id:seller1id},{$pull:{sellerList:seller2id}})
}

function addbuyer(sellerid,buyerid){
    return sellerModel.update({_id:sellerid},{$push:{buyerList:buyerid}})
}
function removebuyer(sellerid, buyerid){
    return sellerModel.update({_id:sellerid},{$pull:{buyerList:buyerid}})
}
function findsellerByName(name){
    return sellerModel.findOne({username:name});
}
function updateseller(sellerId, seller){
    return sellerModel.update({_id: sellerId},{$set: seller});
}

function deleteseller(sellerId){
    return sellerModel.remove({_id:sellerId});
}
function findsellerByCredentials(username, password){
    return sellerModel.findOne({username:username, password:password});
}

function createseller(seller) {
    return sellerModel.create(seller);
}

function findsellerById(sellerId){
    return sellerModel.findById(sellerId);
}
