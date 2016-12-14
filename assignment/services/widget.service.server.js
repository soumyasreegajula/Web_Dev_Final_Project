/**
 * Created by Soumya on 10/29/16.
 */
module.exports = function (app,models) {

    var widgetModel = models.widgetModel;

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", reorderWidgets);



    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var text         = req.body.text;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    widget.url = "/uploads/"+filename;
                    widgetModel
                        .updateWidget(widgetId,widget)
                        .then(
                            function (stats) {
                                res
                                    .redirect("/assignment/#/user/" + userId + "/website/"
                                        + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                            },
                            function (error) {
                                res.send(error);
                            }
                        );
                }
            );

    }

    function reorderWidgets(req,res)
    {
        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);
        var pageId = req.params.pageId;
        widgetModel.reorderWidgets(start,end,pageId)
            .then(
                function(stats) {
                    res.send(stats);
                },
                function(error) {
                    res.statusCode.send(404);
                });
    }


    function createWidget(req , res) {

        var pageId = req.params.pageId;
        var newWidget = req.body;


        widgetModel
            .createWidget(pageId,newWidget)
            .then(
                function (widget) {
                    res.send(widget);
                }
            );
    }



    function findWidgetsByPageId(req, res){
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.send(widgets);
                }
            );
    }

    function findWidgetById(req,res){
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.send(widget);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(widgetId,widget)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
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