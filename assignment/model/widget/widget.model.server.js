/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);

module.exports = widgetModel;
// app.post    ('/api/assignment/page/:pageId/widget', createWidget);
// app.get     ('/assignment/api/assignment/page/:pageId/widget', findWidgetsByPageId);
// app.get     ('/assignment/api/assignment/widget/:widgetId', findWidgetById);
// app.put     ('/api/assignment/widget/:widgetId', updateWidget);
// app.delete  ('/api/assignment/widget/:widgetId', deleteWidget);
// app.post    ('/api/upload', upload.single('myFile'), uploadImage);
// app.put     ('/page/:pageId/widget', sortWidget);
widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

function reorderWidget(pageId, start, end) {
    widgetModel.find({_page: pageId})
        .then((function (widgets) {
            var widgetArr = widgets;
            if(start < end){
                for(var i = 0, len =widgetArr.length; i < len; i++){
                    if(widgetArr[i]['position'] === parseInt(start)){
                        widgetArr[i]['position'] = parseInt(end);
                        widgetModel.remove(widgetArr[i]['_id'])
                        widgetModel.create(widgetArr[i]);

                    } else if(widgetArr[i]['position'] > parseInt(start) && widgetArr[i]['position'] <= parseInt(end)){
                        widgetArr[i]['position'] = widgetArr[i]['position'] - 1;
                        widgetModel.remove(widgetArr[i]['_id'])
                        widgetModel.create(widgetArr[i]);
                    }
                }

            } else {
                for(var y = 0, leng =widgetArr.length; y < leng; y++){
                    if(widgetArr[y]['position'] === parseInt(start)){
                        widgetArr[y]['position'] = parseInt(end);
                        widgetModel.remove(widgetArr[y]['_id'])
                        widgetModel.create(widgetArr[y]);

                    } else if(widgetArr[y]['position'] >= parseInt(end) && widgetArr[y]['position'] < parseInt(start)){
                        widgetArr[y]['position'] = widgetArr[y]['position'] + 1;
                        widgetModel.remove(widgetArr[y]['_id'])
                        widgetModel.create(widgetArr[y]);
                    }
                }

            }
        }));
}
function findWidgetsByPageId(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate('_page')
        .exec();
}
function createWidget(widget) {


    return widgetModel.create(widget);
}
function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}


function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}

