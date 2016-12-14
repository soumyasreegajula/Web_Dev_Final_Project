/**
 * Created by Soumya on 10/29/16.
 */
module.exports = function(app,models) {

    var commodityModel = models.commodityModel;

    app.post("/api/commodity", createCommodity);
    app.get("/api/commodity/:commodityname", findCommodityByName);
    app.get("/api/commoditylist", findAllCommodities);


    function createCommodity(req, res) {
        var commodity = req.body;
        commodityModel
            .createCommodity(commodity)
            .then(
                function (commodity) {
                    res.send(commodity);
                },
                function(error) {
                    console.log(error);
                }
            );
    }

    function findCommodityByName(req, res) {
        var commodityname = req.params.commodityname;

        commodityModel
            .findCommodityByName(commodityname)
            .then(
                function (commodity) {
                    res.json(commodity);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

    function findAllCommodities(req, res) {
        commodityModel
            .findAllCommodities()
            .then(
                function (commodity) {
                    res.json(commodity);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }



};