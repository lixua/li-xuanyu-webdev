var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.post  ('/api/assignment/logout', logout);
app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.get     ('/api/assignment/user', findUserByCredentials);
app.get     ('/api/assignment/user/:userId', findUserById);
app.get     ('/api/assignment/username', findUserByUsername);
app.post    ('/api/assignment/user', createUser);
app.put     ('/api/assignment/user/:userId', updateUser);
app.delete  ('/api/assignment/user/:userId', deleteUser);
app.get('/api/assignment/loggedin', loggedin);
app.post('/api/assignment/register', register);

var facebookConfig= {
    clientID : "318814531895993",
    clientSecret : '7400a70796ac28a1ec9b50d26e4a120d',
    callbackURL  : 'http://li-xuanyu-webdev.herokuapp.com/auth/facebook/callback',
    profileFields: ['emails','id','name','displayName'],
    enableProof: true
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var names = profile.displayName.split(" ");
                    var newFacebookUser = {
                        username: names[1] + names[0],
                        lastName:  names[1],
                        firstName: names[0],
                        email: profile.emails[0].value,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    }
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}
function logout(req, res){
    req.logout();
    res.sendStatus(200);
}
function register(req, res){
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function(user){
            req
                .login(user, function(status){
                    res.send(status);
                })
        })
}
function loggedin(req, res){
    if(req.isAuthenticated()){
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function localStrategy (username, password, done){
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user){
                done(null, user);
            }else {
                done(null, false);
            }
        }, function(error){
            done(error, false);
        })
}
function login(req, res){
    res.json(req.user);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function(status){
            res.sendStatus(200);
        });

}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function(status){
            res.sendStatus(200);
        })

}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function(user){
            res.json(user);
        });

}

function findUserByUsername(req, res) {
    var username = req.query['username'];
    userModel
        .findUserByUsername(username)
        .then(function(user){
            res.json(user);
        })

}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    userModel
        .findUserByCredentials(username,password)
        .then(function(user){
            if(user !== null){
                res.json(user);
            } else {
                res.json("Error:404");
            }
        })


}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function(user){
            res.json(user);
        })

}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}
