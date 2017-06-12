/**
 * Created by xuanyuli on 6/5/17.
 */
var app = require('../../express');
var websiteModel = require('../model/website/website.model.server');
app.get     ('/api/assignment/user/:userId/website', findWebsitesByUser);
app.post    ('/api/assignment/user/:userId/website', createWebsite);
app.get     ('/assignment/api/assignment/website/:websiteId', findWebsiteById);
app.put     ('/api/assignment/website/:websiteId', updateWebsite);
app.delete  ('/api/assignment/website/:websiteId', deleteWebsite);

var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

function createWebsite(req, res) {
    var website = req.body;
    website._user = req.params['userId'];
    websiteModel
        .createWebsite(website)
        .then(function(website){
            res.json(website);
        })
}
function findWebsitesByUser(req, res) {
    websiteModel
        .findWebsitesByUser(req.params.userId)
        .then(function (websites){
            res.json(websites);
        })
    // var resultSet = [];
    // for (var w in websites) {
    //     if (websites[w].developerId === req.params.userId) {
    //         resultSet.push(websites[w]);
    //     }
    // }
    // res.json(resultSet);
}

function findWebsiteById(req, res) {
    var webiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(webiteId)
        .then(function(website){
            res.json(website);
        })
    // var websiteId = req.params['websiteId'];
    // var website = websites.find(function (website) {
    //     return website._id === websiteId;
    // });
    // res.send(website);
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params.websiteId;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function(status){
            res.sendStatus(200);
        })
    // var website = req.body;
    // var websiteId = req.params.websiteId;
    // for (var w in websites) {
    //     if (websiteId === websites[w]._id) {
    //         websites[w] = website;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.send(false);

}


function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(websiteId)
        .then(function(status){
            res.sendStatus(200);
        });
    // var websiteId = req.params.websiteId;
    // var website = websites.find(function (website) {
    //     return website._id === websiteId;
    // });
    // var index = websites.indexOf(website);
    // websites.splice(index, 1);
    // res.sendStatus(200);
}
