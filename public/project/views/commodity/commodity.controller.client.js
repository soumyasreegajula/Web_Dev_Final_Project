/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("CommodityCreateController", CommodityCreateController);



    function CommodityCreateController($location, CommodityService) {
        var vm = this;

        vm.registerComm = registerComm;

        function registerComm (commodityname, commoditypicture) {

            if(commodityname == null || commoditypicture == null ||
                commodityname == "" || commoditypicture == ""){
                vm.error = "Commodity name and picture must be entered";

            } else {

                CommodityService.findCommodityByCName(commodityname)
                    .then(function (response) {
                        var prevCommodity = response.data;
                        if(prevCommodity){
                            vm.error = "Commodity name already Exists";


                        } else {

                            var commodity = {

                                commodityname: commodityname,
                                commoditypicture: commoditypicture

                            };

                            //console.log(commodity);

                            CommodityService.createNewCommodity(commodity)

                                .then(function (response) {

                                    var comm = response.data;
                                   //console.log(comm);
                                });
                        }
                    });
            }
        }
    }
})();
