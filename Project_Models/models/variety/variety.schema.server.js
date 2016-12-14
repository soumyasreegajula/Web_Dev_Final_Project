/**
 * Created by Soumya on 11/22/16.
 */
var mongoose = require("mongoose");
var Commodity = require('../commodity/commodity.schema.server');


var varietySchema = {
    varietyname: {type: String, required: true},
    varietypicture: {type: String, match: /^http:\/\//i},
    priceperton: {type: Number},
    commodityname: Commodity.commoditySchema
};

module.exports = new mongoose.Schema(varietySchema, { collection : 'variety' });
module.exports.varietySchema = varietySchema;