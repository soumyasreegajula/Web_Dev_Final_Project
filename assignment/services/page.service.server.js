/**
 * Created by Soumya on 10/29/16.
 */
module.exports = function (app,models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);



    function createPage(req , res) {
        var websiteId = req.params.websiteId;
        var newPage = req.body;
        pageModel
            .createPage(websiteId,newPage)
            .then(
                function (website) {
                    res.send(website);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.send(pages);
                }
            );
    }

    function findPageById(req,res){
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.send(page);
            });
    };

    function updatePage(req, res) {

        var pageId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pageId,page)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

};