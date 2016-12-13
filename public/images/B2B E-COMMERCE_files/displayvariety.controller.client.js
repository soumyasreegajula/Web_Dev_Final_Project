/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("DisplayVarietyController", DisplayVarietyController);



    function DisplayVarietyController($location, VarietyService, $routeParams, $scope, $http) {
        var vm = this;

        vm.init = init;

        vm.useApi = useApi;



        function init () {


            var commodityname = $routeParams.commodityname;

            VarietyService.findVarietiesFromCommodity(commodityname)
                .then(function (response) {
                    //console.log(response.data);
                    var allVarieties = response.data;
                    $scope.allVarieties=allVarieties;

                });

        }

        function useApi(searchinput) {
            var resource_id= '9ef84268-d588-465a-a308-a864a43d0070';
            var apikey= '68ccc23cbb2821e2981bfd460f2b38ec';


            $http.get("https://data.gov.in/api/datastore/resource.json?resource_id="+ resource_id + "&api-key=" +
                apikey + "&filters[variety]=" + searchinput)
                .then(function(response){ $scope.details = response.data; });


        }
    }
})();
