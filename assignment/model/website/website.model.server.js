/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

module.exports = websiteModel;

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

function findWebsitesByUser(userId){
    return websiteModel
        .find({_user:userId})
        .populate('_user')
        .exec();
}
function createWebsite(website){
    return websiteModel.create(website);
}
function findWebsiteById(websiteId){
    return websiteModel.findById(websiteId);
}


function updateWebsite(websiteId, website){
    return websiteModel.update({_id: websiteId},{$set: website});
}

function deleteWebsite(websiteId){
    return websiteModel.remove({_id:websiteId});
}
