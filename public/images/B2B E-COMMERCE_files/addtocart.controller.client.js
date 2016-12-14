/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("AddToCartController", AddToCartController);


    function AddToCartController($location, BuyerService,$routeParams,$scope) {
        var vm = this;

        vm.init = init;

        vm.error="cart cont";

        function init () {


            var varietyname = $routeParams.varietyname;
            console.log("variety name *********************");
            console.log(varietyname);



            $scope.varietyname=varietyname;

            BuyerService.findSellerByName(varietyname)
                .then(function (response) {
                    //console.log(response.data);
                    var varietyDetails = response.data;
                    console.log("variety details");
                    console.log(varietyDetails);
                    $scope.varietyDetails=varietyDetails;

                    $scope.newObject = {};
                    $scope.disable = {};
                    $scope.$watch(function() {

                            return $scope.newObject;
                        },
                        function(newVal, oldVal) {
                            var newValIndex = 0;
                            for(var key in newVal){ 	 if(newVal[key]===true) newValIndex = parseInt(key); }
                            for(i=0;i<$scope.varietyDetails.length;i++){

                                if(i===newValIndex){

                                    $scope.disable[i] = false;
                                    console.log("checkbox details");
                                    console.log($scope.varietyDetails[i]);
                                    $scope.selectedseller=$scope.varietyDetails[i];
                                }
                                else{
                                    if(newVal[newValIndex.toString()]) {
                                        $scope.disable[i] = true;


                                    }
                                    else {
                                        $scope.disable[i] = false;

                                    }
                                }
                            }
                        }, true);


                });






        }

        vm.loginBuyer = loginBuyer;


        function loginBuyer (username,password) {
            if(username === "" || username == null){
                vm.error = "Please provide a Username"
            } else if (password === "" || password == null){
                vm.error = "Please provide a Password"
            } else {
                BuyerService
                    .loginBuyer(username,password)
                    .then(function (response) {
                            var buyer = response.data;

                            //console.log(buyer);

                            if(buyer){
                                $location.url("/buyer/"+buyer._id);
                            } else {
                                vm.error = "User not found";
                            }
                        },
                        function (error) {
                            vm.error = error;//"User not found !!"
                        });
            }
        }

        vm.registerBuyer = function() {
            $location.url("/registerBuyer");
        }





        vm.addtocart = addtocart;



        function addtocart (quantity) {
            console.log("seller id");
            console.log($scope.selectedseller.username);
            console.log("quantity");
            console.log(quantity);

            if($scope.selectedseller.username== "" || $scope.selectedseller.username == null){
                vm.error = "Please select a Sellername"
            }
             else {
                BuyerService
                    .addtocart($scope.varietyname,$scope.selectedseller.username,quantity)
                    .then(function (response) {
                            var buyer = response.data;

                            //console.log(buyer);

                            if(buyer){
                                $location.url("/checkout");
                            } else {
                                vm.error = "User not found";
                            }
                        },
                        function (error) {
                            vm.error = error;//"User not found !!"
                        });
            }
        }


    }

})();

