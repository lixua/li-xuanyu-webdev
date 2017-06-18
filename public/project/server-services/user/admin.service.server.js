/**
 * Created by xuanyuli on 6/12/17.
 */
var app = require('../../../../express');
var adminModel = require('../../model/user/admin/admin.model.server');
app.get     ('/api/adminLogin', findAdminByCredentials);
app.get     ('/api/admin/:adminId', findAdminById);
app.get     ('/api/admin/username', findAdminByName);
app.post    ('/api/admin', createAdmin);
app.put     ('/api/admin/:adminId', updateAdmin);
app.delete  ('/api/admin/:adminId', deleteAdmin);
app.delete  ('/api/deletebuyer/:buyerId',deleteBuyer);
app.delete  ('/api/deleteseller/:sellerId',deleteSeller);
app.put ('/api/warningbuyer/:buyerId',warnBuyer);
app.put ('/api/warningseller/:sellerId',warnSeller);
function deleteBuyer(req,res){
    var buyerId = req.params.buyerId;
    adminModel
        .deleteBuyer(buyerId)
        .then(function(status){res.sendStatus(200)});
}
function deleteSeller(req, res){
    var sellerId = req.params.sellerId;
    adminModel
        .deleteSeller(sellerId)
        .then(function(status){res.sendStatus(200)});
}
function warnBuyer(req, res){
    var buyerId = req.params.buyerId;
    adminModel
        .warningBuyer(buyerId)
        .then(function(status){res.sendStatus(200)});
}
function warnSeller(req, res){
    var sellerId = req.params.sellerId;
    adminModel
        .warningSeller(sellerId)
        .then(function(status){res.sendStatus(200)});
}

function deleteAdmin(req, res) {
    var adminId = req.params.adminId;
    adminModel
        .deleteAdmin(adminId)
        .then(function(status){
            res.sendStatus(200);
        });

}

function updateAdmin(req, res) {
    var admin = req.body;
    var adminId = req.params.adminId;
    adminModel
        .updateAdmin(adminId, admin)
        .then(function(status){
            res.sendStatus(200);
        })

}

function createAdmin(req, res) {
    var admin = req.body;
    adminModel
        .createAdmin(admin)
        .then(function(admin){
            res.json(admin);
        });

}

function findAdminByName(req, res) {
    var name = req.query['username'];
    adminModel
        .findAdminByName(name)
        .then(function(admin){
            res.json(admin);
        })

}

function findAdminByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    adminModel
        .findAdminByCredentials(username,password)
        .then(function(admin){
            if(admin !== null){
                res.json(admin);
            } else {
                res.json("Error:404");
            }
        })


}

function findAdminById(req, res) {
    var adminId = req.params['adminId'];
    adminModel
        .findAdminById(adminId)
        .then(function(admin){
            res.json(admin);
        })

}