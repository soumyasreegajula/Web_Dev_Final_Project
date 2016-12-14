(function(){
    angular
        .module("WebAppMaker")
        .factory("CommodityService", CommodityService);

    function CommodityService($http) {


        var api = {
            createNewCommodity: createNewCommodity,
            findCommodityByCName: findCommodityByCName,
            findAllCommodities: findAllCommodities
        };
        return api;

        function createNewCommodity(newCommodity){
            //console.warn("in find function");
            return $http.post("/api/commodity",newCommodity);
        }

        function findCommodityByCName(commodityname){
            //console.log('in find function');
            var url = "/api/commodity/"+commodityname;
            return $http.get(url);
        }

        function findAllCommodities(){
            //console.log('in find function');
            var url = "/api/commoditylist/";
            return $http.get(url);
        }

    }

})();