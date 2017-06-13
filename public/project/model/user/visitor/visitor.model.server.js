/**
 * Created by xuanyuli on 6/12/17.
 */
/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var visitorSchema = require('./visitor.schema.server');

var visitorModel = mongoose.model('visitorModel', visitorSchema);

visitorModel.createvisitor = createvisitor;
visitorModel.findvisitorById = findvisitorById;
visitorModel.deletevisitor =deletevisitor;
visitorModel.updatevisitor = updatevisitor;


module.exports = visitorModel;
function updatevisitor(visitorId, visitor){
    return visitorModel.update({_id: visitorId},{$set: visitor});
}

function deletevisitor(visitorId){
    return visitorModel.remove({_id:visitorId});
}



function createvisitor(visitor) {
    return visitorModel.create(visitor);
}

function findvisitorById(visitorId){
    return visitorModel.findById(visitorId);
}
