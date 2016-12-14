/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);


    function WidgetListController($sce, $routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId  = $routeParams['wid'];
        vm.pageId  = $routeParams['pid'];
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;


        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;

                });
        }
        init();



        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

    }





    function NewWidgetController($routeParams, WidgetService,$location,$sce) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId  = $routeParams['wid'];
        vm.pageId  = $routeParams['pid'];

        vm.createWidget=createWidget;



        function createWidget(widgetType) {

            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (response) {
                        var length = response.data.length;
                        var widget = null;
                        switch(widgetType){
                            case 'HEADER':
                                widget= {
                                    "type": "HEADER",
                                    "_page": vm.pageId,
                                    size: null,
                                    "text": "",
                                    widgetNumber: length
                                };
                                break;
                            case 'IMAGE':
                                widget= {
                                    "type": "IMAGE",
                                    "_page": vm.pageId,
                                    "width": "100%",
                                    widgetNumber: length
                                };
                                break;
                            case 'YOUTUBE':
                                widget= {
                                    "type": "YOUTUBE",
                                    "_page": vm.pageId,
                                    "width": "100%",
                                    widgetNumber: length
                                };
                                break;
                            case 'HTML':
                                widget= {
                                    "type": "HTML",
                                    "_page": vm.pageId,
                                    widgetNumber: length
                                };
                                break;
                            case 'TEXT':
                                widget= {
                                    "type": "TEXT",
                                    "_page": vm.pageId,
                                    widgetNumber: length
                                };
                                break;
                        }

                        WidgetService
                            .createWidget(vm.pageId,widget)
                            .then(function (response) {
                                var widgt = response.data;
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widgt._id);
                            });
                    }
                );

        }
    }



    function EditWidgetController($routeParams,
                                      WidgetService,$sce,$location) {
        var vm  = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId  = $routeParams['wid'];
        vm.pageId  = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                });
        }
        init();

        vm.updateWidget = updateWidget;

        function updateWidget() {
            console.log("inside widget");
            vm.error = null;
            console.log(vm.widget.name);
            console.log(vm.widget);

            if(vm.widget.name == null || vm.widget.name == "" ||vm.widget.name=="undefined"){
                vm.error = "Widget Name cannot be blank !!";
            } else {
                WidgetService
                    .updateWidget(vm.widgetId,vm.widget)
                    .then(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    });
            }
        }

        vm.deleteWidget = deleteWidget;

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }

    }
})();