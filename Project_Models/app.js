/**
 * Created by Soumya on 10/29/16.
 */



module.exports = function(app) {

    var models = require("./models/models.server")();

    require("./services/buyer.service.server.js")(app, models);
    require("./services/commodity.service.server.js")(app, models);
    require("./services/variety.service.server.js")(app, models);
};