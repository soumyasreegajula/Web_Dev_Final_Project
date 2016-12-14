/**
 * Created by Soumya on 11/22/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var CommoditySchema = require("./commodity.schema.server");

    var Commodity = mongoose.model("Commodity", CommoditySchema);

    var api = {

        createCommodity: createCommodity,
        findCommodityByName: findCommodityByName,
        findAllCommodities: findAllCommodities
    };
    return api;

    function createCommodity(commodityName) {
        return Commodity.create(commodityName);
    }

    function findCommodityByName(commodityName) {
        return Commodity.findOne({commodityname: commodityName });
    }

    function findAllCommodities() {
        return Commodity.find();
    }
};