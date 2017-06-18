/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('pageModel', pageSchema);

module.exports = pageModel;

pageModel.createpage = createpage;
pageModel.findPageByWebsiteId = findPageByWebsiteId;
pageModel.findpageById = findpageById;
pageModel.updatepage = updatepage;
pageModel.deletepage = deletepage;

function findPageByWebsiteId(websiteId){
    return pageModel
        .find({_website:websiteId})
        .populate('_website')
        .exec();
}
function createpage(page){
    return pageModel.create(page);
}
function findpageById(pageId){
    return pageModel.findById(pageId);
}


function updatepage(pageId, page){
    return pageModel.update({_id: pageId},{$set: page});
}

function deletepage(pageId){
    return pageModel.remove({_id:pageId});
}
