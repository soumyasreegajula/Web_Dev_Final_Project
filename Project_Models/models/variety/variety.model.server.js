/**
 * Created by Soumya on 11/22/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var VarietySchema = require("./variety.schema.server");

    var Variety = mongoose.model("Variety", VarietySchema);

    var api = {
        createVariety: createVariety,
        findVarietyByName: findVarietyByName,
        findVarietiesFromCommodity: findVarietiesFromCommodity
    };
    return api;

    function createVariety(variety) {
        return Variety.create(variety);
    }
    
    function findVarietyByName(varietyName) {
        return Variety.findOne({varietyname: varietyName });
    }

    function findVarietiesFromCommodity(commodityname) {
        return Variety.find({ commodityname: {commodityname: commodityname} });
    }

};