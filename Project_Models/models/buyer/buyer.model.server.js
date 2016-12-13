module.exports = function () {

    var mongoose = require("mongoose");
    var BuyerSchema = require("./buyer.schema.server");


    var Buyer = mongoose.model('Buyer', BuyerSchema);

    var api = {
        createBuyer: createBuyer,
        findBuyerById: findBuyerById,
        findBuyerByBuyername: findBuyerByBuyername,
        findBuyerByCredentials: findBuyerByCredentials,
        updateBuyer: updateBuyer,
        deleteBuyer: deleteBuyer,
        updateCart:updateCart,
        findSellerByName:findSellerByName,
        findCartDetails:findCartDetails,
        updatePurchases: updatePurchases,
        subscribe: subscribe,
        subscribeseller: subscribeseller,
        findSubscriberDetails:findSubscriberDetails,
        findUserByFacebookId:findUserByFacebookId
        //findUserByGoogleId:findUserByGoogleId
    };
    return api;

    function createBuyer(buyer) {
        return Buyer.create(buyer);
    }



    function findBuyerById(buyerId) {
        return Buyer.findById(buyerId);
    }

    function findBuyerByBuyername(username) {



        return Buyer.findOne({username: username });
    }

    function findSellerByName(varietyname) {

        //Buyer.findOne({},function(err,docs){console.log(docs)});

        return Buyer.find({varietyname: varietyname });
    }

    function findBuyerByCredentials(username, password) {
        return Buyer.findOne({username: username, password: password});
    }

    function updateBuyer(buyerId, buyer) {
        delete buyer._id;
        console.log("buyer cart");
        return Buyer
            .update(
                {_id: buyerId},
                {$set: buyer}
            );
    }

    function updateCart(buyerId, cart) {

        console.log("buyer cart");
        return Buyer
            .update(
                {_id: buyerId},
                {$push: {cart: cart}}
            );
    }

    function updatePurchases(buyerId, bought) {

        return Buyer
            .update(
                {_id: buyerId},
                {$push: {bought: bought}}
            );
    }

    function subscribe(buyerId, sellername) {

        console.log('$$$$$$$$$$$$' + buyerId + 'sellername: ' + sellername);

        return Buyer
            .update(
                {_id: buyerId},
                {$push: {subscribers: sellername}}
            );

    }



    var sellerId;
    var buyername;



    function subscribeseller(buyerId, sellername) {

            console.log("subscribe seller");
            console.log(Buyer.findOne({username: sellername }));
            return Buyer.findOne({username: sellername }, function (err, data) {
                sellerId=data._id;
                console.log('*******' + sellerId);

                return Buyer.findById(buyerId, function (err, data) {

                    buyername=data.username;


                    return Buyer.findById(buyerId, function (err, data) {


                            return Buyer
                                .findOneAndUpdate(
                                    {_id: sellerId},
                                    {$push: {subscribers: buyername}}
                                , function (err, data) {
                                        console.log("##########errors: "+err)
                                    });
                        }
                    )



                })
            });












    }

    function findCartDetails(buyerId)
    {


        return Buyer.findById(buyerId).select('cart -_id');

    }

    function findSubscriberDetails(buyerId)
    {


        return Buyer.findById(buyerId).select('subscribers -_id');

    }


    function deleteBuyer(buyerId) {
        return Buyer.remove({_id: buyerId});
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({"facebook.id": facebookId});
    }

    /*function findUserByGoogleId(googleId) {
        return User.findOne({"google.id": googleId});
    }*/

};