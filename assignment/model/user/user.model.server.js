/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser =deleteUser;
userModel.updateUser = updateUser;
userModel.findUserByUsername =findUserByUsername;

module.exports = userModel;
function findUserByUsername(username){
    return userModel.findOne({username:username});
}
function updateUser(userId, user){
    return userModel.update({_id: userId},{$set: user});
}

function deleteUser(userId){
    return userModel.remove({_id:userId});
}
function findUserByCredentials(username, password){
    return userModel.findOne({username:username, password:password});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId){
    return userModel.findById(userId);
}
