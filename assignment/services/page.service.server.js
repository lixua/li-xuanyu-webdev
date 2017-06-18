/**
 * Created by xuanyuli on 6/5/17.
 */
var app = require('../../express');
var pageModel = require('../model/page/page.model.server');
app.post    ('/api/assignment/website/:websiteId/page', createPage);
app.get     ('/assignment/api/assignment/website/:websiteId/page', findPageByWebsiteId);
app.get     ('/assignment/api/assignment/page/:pageId', findPageById);
app.put     ('/api/assignment/page/:pageId', updatePage);
app.delete  ('/api/assignment/page/:pageId', deletePage);

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

function createPage(req, res) {
    var page = req.body;
    page._website = req.params['websiteId'];
    pageModel
        .createpage(page)
        .then(function(page){
            res.json(page);
        })
    // page.websiteId = req.params['websiteId'];
    // page._id = (new Date()).getTime() + "";
    // pages.push(page);
    // res.send(page);
}

function findPageByWebsiteId(req, res) {
    pageModel
        .findPageByWebsiteId(req.params.websiteId)
        .then(function (pages) {
            res.json(pages);
        })

    // var resultSet = [];
    // for (var p in pages) {
    //     if (pages[p].websiteId === req.params.websiteId) {
    //         resultSet.push(pages[p]);
    //     }
    // }
    // res.json(resultSet);
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel
        .findpageById(pageId)
        .then(function(page){
            res.json(page);
        })
    // var pageId = req.params['pageId'];
    // var page = pages.find(function (page) {
    //     return page._id === pageId;
    // });
    // res.send(page);
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params.pageId;
    pageModel
        .updatepage(pageId, page)
        .then(function(status){
            res.sendStatus(200);
        })
    // var page = req.body;
    // var pageId = req.params.pageId;
    // for (var p in pages) {
    //     if (pageId === pages[p]._id) {
    //         pages[u] = page;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.send(false);

}


function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .deletepage(pageId)
        .then(function(status){
            res.sendStatus(200);
        });
    // var pageId = req.params.pageId;
    // var page = pages.find(function (page) {
    //     return page._id === pageId;
    // });
    // var index = pages.indexOf(page);
    // pages.splice(index, 1);
    // res.sendStatus(200);
}
