/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("FinalPageController", FinalPageController);


    function FinalPageController($location, BuyerService,$routeParams,$scope) {
        var vm = this;

        vm.subscribe = subscribe;



        function subscribe () {

            //console.log("***********" + $scope.selectedcart);

            var sellername = $routeParams.sellername;

                BuyerService
                    .subscribe(sellername)
                    .then(function (response) {
                            var buyer = response.data;

                            console.log(buyer);

                            if(buyer){
                                vm.error="Subscription successfully done!! Please select home button to go to home page";
                            } else {
                                vm.error = "Purchase failed";
                            }
                        },
                        function (error) {
                            vm.error = error;//"User not found !!"
                        });

            BuyerService
                .subscribeseller(sellername)
                .then(function (response) {
                        var buyer = response.data;

                        console.log(buyer);

                        if(buyer){
                            vm.error="Subscription successfully done!! Please select home button to go to home page";

                        } else {
                            vm.error = "Purchase failed";
                        }
                    },
                    function (error) {
                        vm.error = error;//"User not found !!"
                    });

        }


    }

})();

