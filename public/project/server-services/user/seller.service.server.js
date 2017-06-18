/**
 * Created by xuanyuli on 6/12/17.
 */
/**
 * Created by xuanyuli on 6/12/17.
 */
var app = require('../../../../express');
var sellerModel = require('../../model/user/seller/seller.model.server');
app.get     ('/api/sellerLogin', findsellerByCredentials);
app.get     ('/api/seller/:sellerId', findsellerById);
app.get     ('/api/seller/username', findsellerByName);
app.post    ('/api/seller', createseller);
app.put     ('/api/seller/:sellerId', updateseller);
app.delete  ('/api/seller/:sellerId', deleteseller);


function deleteseller(req, res) {
    var sellerId = req.params.sellerId;
    sellerModel
        .deleteseller(sellerId)
        .then(function(status){
            res.sendStatus(200);
        });

}

function updateseller(req, res) {
    var seller = req.body;
    var sellerId = req.params.sellerId;
    sellerModel
        .updateseller(sellerId, seller)
        .then(function(status){
            res.sendStatus(200);
        })

}

function createseller(req, res) {
    var seller = req.body;
    sellerModel
        .createseller(seller)
        .then(function(seller){
            res.json(seller);
        });

}

function findsellerByName(req, res) {
    var name = req.query['username'];
    sellerModel
        .findsellerByName(name)
        .then(function(seller){
            res.json(seller);
        })

}

function findsellerByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    sellerModel
        .findsellerByCredentials(username,password)
        .then(function(seller){
            if(seller !== null){
                res.json(seller);
            } else {
                res.json("Error:404");
            }
        })


}

function findsellerById(req, res) {
    var sellerId = req.params['sellerId'];
    sellerModel
        .findsellerById(sellerId)
        .then(function(seller){
            res.json(seller);
        })

}