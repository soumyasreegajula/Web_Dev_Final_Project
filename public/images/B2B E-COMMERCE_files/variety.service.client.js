(function(){
    angular
        .module("WebAppMaker")
        .factory("VarietyService", VarietyService);

    function VarietyService($http) {


        var api = {
            createNewVariety: createNewVariety,
            findVarietyByName: findVarietyByName,
            findVarietiesFromCommodity: findVarietiesFromCommodity
        };
        return api;

        function createNewVariety(newVariety){
            //console.warn("in find function");
            return $http.post("/api/variety",newVariety);
        }

        function findVarietyByName(varietyname){
            //console.log('in find function');
            var url = "/api/variety/"+varietyname;
            return $http.get(url);
        }

        function findVarietiesFromCommodity(commodityname) {
            var url = "/api/varietylist/"+commodityname;
            //console.log($http.get(url));
            return $http.get(url);
        }






    }

})();