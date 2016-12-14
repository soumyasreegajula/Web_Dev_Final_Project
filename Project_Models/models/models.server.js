/**
 * Created by Soumya on 11/22/16.
 */
module.exports = function () {

   //var connectionString = 'mongodb://heroku_l9k5l498:kglc93adso36i37j36esrr74t6@ds033126.mlab.com:33126/heroku_l9k5l498';
    var db = 'mongodb://localhost/wam';
    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    //mongoose.Promise == global.Promise;
    var mongoose = require("mongoose");
    mongoose.Promise = require('bluebird');

    mongoose.connect(db);
    //mongoose.connect(connectionString);

    var models = {
        buyerModel: require("./buyer/buyer.model.server.js")(),
        commodityModel: require("./commodity/commodity.model.server")(),
        varietyModel: require("./variety/variety.model.server")()
    };

    return models;
};

