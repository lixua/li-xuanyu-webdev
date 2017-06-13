/**
 * Created by xuanyuli on 6/12/17.
 */
var app = require('../../../../express');
var buyerModel = require('../../model/user/buyer/buyer.model.server');
app.get     ('/api/buyerLogin', findbuyerByCredentials);
app.get     ('/api/buyer/:buyerId', findbuyerById);
app.get     ('/api/buyer/username', findbuyerByName);
app.post    ('/api/buyer', createbuyer);
app.put     ('/api/buyer/:buyerId', updatebuyer);
app.delete  ('/api/buyer/:buyerId', deletebuyer);


function deletebuyer(req, res) {
    var buyerId = req.params.buyerId;
    buyerModel
        .deletebuyer(buyerId)
        .then(function(status){
            res.sendStatus(200);
        });

}

function updatebuyer(req, res) {
    var buyer = req.body;
    var buyerId = req.params.buyerId;
    buyerModel
        .updatebuyer(buyerId, buyer)
        .then(function(status){
            res.sendStatus(200);
        })

}

function createbuyer(req, res) {
    var buyer = req.body;
    buyerModel
        .createbuyer(buyer)
        .then(function(buyer){
            res.json(buyer);
        });

}

function findbuyerByName(req, res) {
    var name = req.query['username'];
    buyerModel
        .findbuyerByName(name)
        .then(function(buyer){
            res.json(buyer);
        })

}

function findbuyerByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    buyerModel
        .findbuyerByCredentials(username,password)
        .then(function(buyer){
            if(buyer !== null){
                res.json(buyer);
            } else {
                res.json("Error:404");
            }
        })


}

function findbuyerById(req, res) {
    var buyerId = req.params['buyerId'];
    buyerModel
        .findbuyerById(buyerId)
        .then(function(buyer){
            res.json(buyer);
        })

}