/**
 * Created by Soumya on 11/2/16.
 */
(function(){
    angular
        .module("jga-directives",[])
        .directive("sortable",sortable);
    function sortable(){
        function linker(scope,element,attributes){
            var initial=-1;
            var final=-1;

            element = $(element);
            element
                .sortable({
                    start:function(event,ui){
                        initial=$(ui.item).index();

                    },
                    stop:function(event,ui){
                        final=$(ui.item).index();
                        scope.sortableController.sort(initial,final);

                    }
                });

        }

        return{
            scope:{},
            link:linker,
            controller: sortableController,
            controllerAs:'sortableController'
        }
    }
    function sortableController($routeParams,WidgetService){
        var vm=this;
        vm.sort = sort;
        vm.pageId=$routeParams['pid'];

        function sort(start,end){
            WidgetService.reorderWidgets(start,end,vm.pageId);
        }
    }
})();