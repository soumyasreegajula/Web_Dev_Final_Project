/**
 * Created by Soumya on 10/29/16.
 */
module.exports = function(app,models) {

    var varietyModel = models.varietyModel;

    app.post("/api/variety", createVariety);
    app.get("/api/variety/:varietyname", findVarietyByName);
    app.get("/api/varietylist/:commodityname", findVarietiesFromCommodity);

    function createVariety(req, res) {
        var variety = req.body;

        variety.commodityname = {commodityname: variety.commodityname};
        //console.log(variety);

        varietyModel
            .createVariety(variety)
            .then(
                function (variety) {
                    res.send(variety);
                },
                function(error) {
                    console.log(error);
                }
            );
    }

    function findVarietyByName(req, res) {
        var varietyname = req.params.varietyname;

        varietyModel
            .findVarietyByName(varietyname)
            .then(
                function (variety) {
                    res.json(variety);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

    function findVarietiesFromCommodity(req, res) {
        var commodityname = req.params.commodityname;

        varietyModel
            .findVarietiesFromCommodity(commodityname)
            .then(
                function (commodity) {
                    console.log(commodity);
                    res.json(commodity);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

};