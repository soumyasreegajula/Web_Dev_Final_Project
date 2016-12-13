/**
 * Created by Soumya on 11/22/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();



    var Website = mongoose.model("Website", WebsiteSchema);




    var api = {
        createWebsite: createWebsite,
        findWebsitesByUser: findWebsitesByUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite

    };
    return api;




    function createWebsite(userId, website) {

        return Website.create(website);
    }

    function findWebsitesByUser(userId) {

        return Website.find({"_user": userId});
    }


    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }


    function updateWebsite(websiteId, website) {
        delete website._id;
        return Website.update(
            {_id: websiteId},
            {$set: website}
        );
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }


};