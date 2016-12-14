/**
 * Created by Soumya on 10/29/16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;
module.exports = function(app,models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/loggedIn', loggedIn);


    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignment/#/login'
    }));
    passport.use('wam', new LocalStrategy(localStrategy));
    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

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


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user )  {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        done(err);
                    }
                }
            );
    }

    function loggedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.status(400).send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        console.log(req.body.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if(user) {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    //console.log(process.env.FACEBOOK_CLIENT_ID);
    var facebookConfig = {
        clientID     : '1093174587446798',
        clientSecret : '8c53b10ad25d630984a316b8e3a66578',
        callbackURL  : 'http://localhost:3000/auth/facebook/callback'
    };
    console.log(facebookConfig.clientID);

    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            //console.log(userModel.findUserByFacebookId(profile.id))
            .then(

                function(faceBookUser) {
                    if(faceBookUser) {
                        done(null,faceBookUser);
                    } else{
                        faceBookUser={
                            username:profile.displayName.replace(/ /g,''),
                            facebook:{
                                token:token,
                                displayName:profile.displayName,
                                id:profile.id
                            }
                        };
                        userModel.createUser(faceBookUser)
                            .then(function(user){
                                done(null,user);
                            })
                    }
                });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body ;

        userModel
            .updateUser(userId, user)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    res.send(user);
                },
                function(error) {
                    console.log(error);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);

                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            )
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username,password)
            .then(
                function (user) {
                    res.json(user);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

};