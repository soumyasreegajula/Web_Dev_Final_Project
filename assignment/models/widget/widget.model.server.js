module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();

    var Widget= mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidgets:reorderWidgets
    };

    return api;


    function reorderWidgets(start,end,pageId)
    {
        return Widget.find(
            function(err,widgets) {
                widgets.forEach(function(widget) {

                    if(start > end) {
                        if(widget.widgetNumber < start && widget.widgetNumber >= end) {
                            widget.widgetNumber++;
                            widget.save(function(){});

                        } else if(widget.widgetNumber===start) {
                            widget.widgetNumber = end;
                            widget.save(function(){});

                        }
                    } else {
                        if(widget.widgetNumber>start && widget.widgetNumber<=end) {
                            widget.widgetNumber--;
                            widget.save(function(){});

                        } else if(widget.widgetNumber===start) {
                            widget.widgetNumber=end;
                            widget.save(function(){});

                        }
                    }
                });
            });
    }

    function createWidget(pageId, widget) {
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }


    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.update(
            {_id: widgetId},
            {$set: widget}
        );
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }


};