/**
 * Created by Soumya on 10/29/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;
//var GoogleStrategy = require('passport-google').Strategy;


module.exports = function(app,models) {

    var buyerModel = models.buyerModel;

    app.post("/api/loginBuyer", passport.authenticate('wam'), loginBuyer);
    app.post('/api/logoutBuyer', logoutBuyer);
    app.post('/api/registerBuyer', registerBuyer);
    app.get('/api/loggedInBuyer', loggedInBuyer);


    app.post("/api/buyer", createBuyer);
    app.get("/api/buyer", findBuyer);
    app.get("/api/buyer/:buyerId", findBuyerById);
    app.get("/api/buyer?username=username", findBuyerByBuyername);
    app.get("/api/buyer?username=username&password=password", findBuyerByCredentials);
    app.put("/api/buyer/:buyerId", updateBuyer);
    app.delete("/api/buyer/:buyerId", deleteBuyer);
    app.get("/api/seller/:varietyname",findSellerByName);
    app.post("/api/cart/",addtocart);
    app.post("/api/purchases/",addtobought);
    app.get("/api/cartdetails",findCartDetails);
    app.get("/api/subscribe/:sellername", subscribe);
    app.get("/api/subscribeseller/:sellername", subscribeseller);
    app.get("/api/subdetails",findSubscriberDetails);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/project/#/home',
        failureRedirect: '/project/#/loginBuyer'
    }));

   /* app.get ('/auth/google', passport.authenticate('google', { scope : 'email' }));
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/project/#/home',
        failureRedirect: '/project/#/loginBuyer'
    }));*/

    passport.use('wam', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, localStrategy));
    passport.serializeUser(serializeBuyer);
    passport.deserializeUser(deserializeBuyer);


    function localStrategy(username, password, done) {

        //console.log("Logging buyer info in strategy: " + username);

        buyerModel
            .findBuyerByBuyername(username)
            .then(
                function(buyer) {

                    if(buyer && bcrypt.compareSync(password, buyer.password))  {
                        //console.log("Logging buyer info in strategy: " + buyer.username);
                        done(null, buyer);
                    } else {
                        //console.log("Logging buyer info in else strategy: " + buyer.username);
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

    function serializeBuyer(buyer, done) {
        done(null, buyer);
    }

    function deserializeBuyer(buyer, done) {
        buyerModel
            .findBuyerById(buyer._id)
            .then(
                function(buyer){
                    done(null, buyer);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedInBuyer(req, res) {
        if(req.user){

            res.json(req.user);}
        else
        {
            res.send('0');
        }

    }




    function logoutBuyer(req, res) {

        req.logOut();
        res.send(200);
    }

    function loginBuyer(req, res) {
        var buyer = req.user;


        res.json(buyer);
    }

    function registerBuyer(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var role = req.body.role;

        buyerModel
            .findBuyerByBuyername(username)
            .then(
                function(buyer) {
                    if(buyer) {
                        res.status(400).send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return buyerModel
                            .createBuyer(req.body);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(buyer) {
                    if(buyer) {
                        req.login(buyer, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(buyer);
                            }
                        })
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }



    function deleteBuyer(req, res) {
        var buyerId = req.params.buyerId;
        buyerModel
            .deleteBuyer(buyerId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateBuyer(req, res) {
        var buyerId = req.params.buyerId;
        var buyer = req.body ;

        buyerModel
            .updateBuyer(buyerId, buyer)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }


    function addtocart(req, res) {
        var buyerId = req.user;

        var cart = req.body ;

        buyerModel
            .updateCart(buyerId, cart)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function addtobought(req, res) {
        var buyerId = req.user;

        var bought = req.body ;

        buyerModel
            .updatePurchases(buyerId, bought)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function subscribe(req, res) {
        var sellername = req.params.sellername;
        var buyerId = req.user;

        buyerModel
            .subscribe(buyerId, sellername)
            .then(
                function (buyer) {

                    res.json(buyer);


                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            )


    }

    function subscribeseller(req, res) {
        var sellername = req.params.sellername;
        var buyerId = req.user;

        buyerModel
            .subscribeseller(buyerId, sellername)
            .then(
                function (buyer) {

                    res.json(buyer);


                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            )


    }


    function findSellerByName(req,res){

        var varietyname = req.params.varietyname;


        buyerModel
            .findSellerByName(varietyname)
            .then(
                function (buyer) {
                    res.json(buyer);


                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            )

    }
    function createBuyer(req, res) {
        var buyer = req.body;
        buyerModel
            .createBuyer(buyer)
            .then(
                function (buyer) {
                    res.send(buyer);
                },
                function(error) {
                    console.log(error);
                }
            );
    }

    function findBuyerById(req, res) {
        var buyerId = req.params.buyerId;

        buyerModel
            .findBuyerById(buyerId)
            .then(
                function (buyer) {
                    res.json(buyer);

                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            )
    }

    function findBuyer(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findBuyerByCredentials(username, password, res);
        } else if(username) {
            findBuyerByBuyername(username, res);
        } else {
            res.send(buyers);
        }
    }

    function findBuyerByCredentials(username, password, res) {
        buyerModel
            .findBuyerByCredentials(username,password)
            .then(
                function (buyer) {
                    res.json(buyer);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

    function findBuyerByBuyername(username, res) {
        buyerModel
            .findBuyerByBuyername(username)
            .then(
                function (buyer) {
                    res.json(buyer);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

    function findCartDetails(req,res){
        var buyerId = req.user;
        buyerModel
            .findCartDetails(buyerId)
            .then(
                function (buyer) {
                    res.json(buyer);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );

    }


    function findSubscriberDetails(req,res){
        var buyerId = req.user;
        buyerModel
            .findSubscriberDetails(buyerId)
            .then(
                function (buyer) {
                    res.json(buyer);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );

    }

    var facebookConfig = {
        clientID     : '1093174587446798',
        clientSecret : '8c53b10ad25d630984a316b8e3a66578',
        callbackURL  : 'http://localhost:3000/auth/facebook/callback'
    };
    console.log(facebookConfig.clientID);

    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        buyerModel
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
                        buyerModel.createUser(faceBookUser)
                            .then(function(user){
                                done(null,user);
                            })
                    }
                });
    }


/*
    var googleConfig = {
        clientID     : '1093174587446798',
        clientSecret : '8c53b10ad25d630984a316b8e3a66578',
        callbackURL  : 'http://127.0.0.1:3000/auth/google/callback'
    };
    console.log(googleConfig.clientID);

    passport.use('google', new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        buyerModel
            .findUserByGoogleId(profile.id)
            //console.log(userModel.findUserByFacebookId(profile.id))
            .then(

                function(googleUser) {
                    if(googleUser) {
                        done(null,googleUser);
                    } else{
                        googleUser={
                            username:profile.displayName.replace(/ /g,''),
                            google:{
                                token:token,
                                displayName:profile.displayName,
                                id:profile.id
                            }
                        };
                        buyerModel.createUser(googleUser)
                            .then(function(user){
                                done(null,user);
                            })
                    }
                });
    }*/
};