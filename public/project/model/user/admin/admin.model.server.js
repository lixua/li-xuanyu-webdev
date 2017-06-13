/**
 * Created by xuanyuli on 6/12/17.
 */
/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var adminSchema = require('./admin.schema.server');
var buyerModel = require('../buyer/buyer.model.server');
var sellerModel = require('../seller/seller.model.server');
var adminModel = mongoose.model('adminModel', adminSchema);

adminModel.createAdmin = createAdmin;
adminModel.findAdminById = findAdminById;
adminModel.findAdminByCredentials = findAdminByCredentials;
adminModel.deleteAdmin =deleteAdmin;
adminModel.updateAdmin = updateAdmin;
adminModel.findAdminByName =findAdminByName;
adminModel.deleteBuyer = deleteBuyer;
adminModel.deleteSeller = deleteSeller;
adminModel.warningBuyer = warningBuyer;
adminModel.warningSeller = warningSeller;

function deleteBuyer(buyerId){
    return buyerModel.remove(buyerId);
}
function deleteSeller(sellerId){
    return sellerModel.remove(sellerId);
}
function warningBuyer(buyerId){
    return buyerModel.update({_id:buyerId},{warning:true});
}
function warningSeller(sellerId){
    return sellerModel.update({_id: buyerId},{warning:true});
}

module.exports = adminModel;
function findAdminByName(name){
    return adminModel.findOne({username:name});
}
function updateAdmin(adminId, admin){
    return adminModel.update({_id: adminId},{$set: admin});
}

function deleteAdmin(adminId){
    return adminModel.remove({_id:adminId});
}
function findAdminByCredentials(username, password){
    return adminModel.findOne({username:username, password:password});
}

function createAdmin(admin) {
    return adminModel.create(admin);
}

function findAdminById(adminId){
    return adminModel.findById(adminId);
}
