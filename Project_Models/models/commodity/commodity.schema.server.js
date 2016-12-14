/**
 * Created by Soumya on 11/22/16.
 */
var mongoose = require("mongoose");

var commoditySchema = {
    commodityname: {type: String, required: true},
    commoditypicture: {type: String, match: /^http:\/\//i}
};


module.exports = new mongoose.Schema(commoditySchema, { collection : 'commodity' });
module.exports.commoditySchema = commoditySchema;