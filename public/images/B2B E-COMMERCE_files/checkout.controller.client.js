/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("CheckOutController", CheckOutController);


    function CheckOutController($location, BuyerService,$routeParams,$scope) {
        var vm = this;

        vm.init = init;

        vm.addtobought = addtobought;

        function init () {

            BuyerService.findCartDetails()
                .then(function (response) {
                    //console.log(response.data);
                    var cartDetails = response.data;

                    $scope.cartDetails=cartDetails.cart;


                    $scope.newObject = {};
                    $scope.disable = {};
                    $scope.$watch(function() {

                            return $scope.newObject;
                        },
                        function(newVal, oldVal) {
                            var newValIndex = 0;
                            for(var key in newVal){ 	 if(newVal[key]===true) newValIndex = parseInt(key); }


                                for(i=0;i<$scope.cartDetails.length;i++){

                                    //console.log("entire cart: " + cart1)

                                    if(i===newValIndex){

                                        $scope.disable[i] = false;
                                        /*console.log("checkbox details");
                                        console.log(cart1[i]);*/
                                        $scope.selectedcart=$scope.cartDetails[i];
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




        function addtobought () {

            //console.log("***********" + $scope.selectedcart);

                BuyerService
                    .addtobought($scope.selectedcart.sellername,$scope.selectedcart.varietyname,$scope.selectedcart.quantity)
                    .then(function (response) {
                            var buyer = response.data;

                            //console.log(buyer);

                            if(buyer){
                                $location.url("/thankyou/" + $scope.selectedcart.sellername);
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

