/**
 * Created by xuanyuli on 6/5/17.
 */
var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

app.post    ('/api/assignment/page/:pageId/widget', createWidget);
app.get     ('/assignment/api/assignment/page/:pageId/widget', findWidgetsByPageId);
app.get     ('/assignment/api/assignment/widget/:widgetId', findWidgetById);
app.put     ('/api/assignment/widget/:widgetId', updateWidget);
app.delete  ('/api/assignment/widget/:widgetId', deleteWidget);
app.post    ('/api/upload', upload.single('myFile'), uploadImage);
app.put     ('/page/:pageId/widget', sortWidget);


var widgets =
    [
        {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

function sortWidget(req, res) {
    var pageId = req.params['pageId'];
    var start = req.query['initial'];
    var end = req.query['final'];
    var oldlist = [];
    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            oldlist.push(w);
        }
    }
    var oldindex = oldlist[start];
    var newindex = oldlist[end];
    var widget = widgets[oldindex];
    widgets.splice(oldindex, 1);
    widgets.splice(newindex, 0, widget);
    res.sendStatus(200);
}

function createWidget(req, res) {
    var widget = req.body;
    widget.pageId = req.params['pageId'];
    if (typeof(widget._id) === 'undefined') {
        widget._id = (new Date()).getTime() + "";
    }
    widgets.push(widget);
    console.log(widgets);
    res.send(widget);
}

function findWidgetsByPageId(req, res) {
    var resultSet = [];
    for (var w in widgets) {
        if (widgets[w].pageId === req.params.pageId) {
            resultSet.push(widgets[w]);
        }
    }
    res.json(resultSet);
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    res.send(widget);
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    for (var w in widgets) {
        if (widgetId === widgets[w]._id) {
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.send(false);

}


function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.send(false);
}


function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;
    var exist = false;

    var widget = {
        "_id": widgetId, "widgetType": "IMAGE", "pageId": pageId, "width": width,
        "url": "uploads/" + filename
    };

    for (var w in widgets) {
        if (widgetId === widgets[w]._id) {
            widgets[w] = widget;
            exist = true;
        }
    }

    if(!exist){
        widgets.push(widget);
    }


    var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
    res.redirect(callbackUrl);
}