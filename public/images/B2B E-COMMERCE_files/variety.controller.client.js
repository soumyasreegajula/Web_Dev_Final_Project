/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("VarietyCreateController", VarietyCreateController);



    function VarietyCreateController($location, VarietyService) {
        var vm = this;

        vm.registerVariety = registerVariety;



        function registerVariety (varietyname, varietypicture, priceperton, commodityname) {

            if(varietyname == null || varietypicture == null || commodityname == null || priceperton == null ||
                varietyname == "" || varietypicture == "" || priceperton == "" || commodityname == ""){
                vm.error = "Variety name, picture and commodityname must be entered";

            } else {

                VarietyService.findVarietyByName(varietyname)
                    .then(function (response) {
                        var prevVariety = response.data;
                        if(prevVariety){
                            vm.error = "Variety name already Exists";


                        } else {

                            var variety = {
                                varietyname: varietyname,
                                varietypicture: varietypicture,
                                priceperton: priceperton,
                                commodityname: commodityname
                            };

                            console.log(variety);

                            VarietyService.createNewVariety(variety)

                                .then(function (response) {

                                    var comm = response.data;

                                   console.log(comm);
                                });
                        }
                    });
            }
        }
    }
})();
