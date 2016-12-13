/**
 * Created by Soumya on 10/16/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controller: "CommoditiesDefaultController",
                controllerAs: "model"
            })
            .when("/mainpage", {
                templateUrl: "views/mainpage/mainpage.view.client.html",
                controller: "CommoditiesMainController",
                controllerAs: "model"
            })
            .when("/loginBuyer", {
                templateUrl: "views/buyer/login.view.client.html",
                controller: "LoginController",
                controllerAs: "buyerModel"
            })
            .when("/registerBuyer", {
                templateUrl: "views/buyer/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "buyerModel"
            })
            .when("/buyer/:uid", {
                templateUrl: "views/buyer/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "buyerModel",
                resolve :{
                    loggedIn: checkLoggedInBuyer
                }
            })
            .when("/seller/:uid", {
                templateUrl: "views/buyer/sellerprofile.view.client.html",
                controller: "SellerProfileController",
                controllerAs: "buyerModel",
                resolve :{
                    loggedIn: checkLoggedInBuyer
                }
            })


            .when("/commodity/:commodityname", {
                templateUrl: "views/displayvariety/displayvariety.view.client.html",
                controller: "DisplayVarietyController",
                controllerAs: "model"
            })

            .when("/variety/:varietyname", {
                templateUrl: "views/displaydetails/displaydetails.view.client.html",
                controller: "DisplayDetailsController",
                controllerAs: "model"
            })


            .when("/createCommodity", {
                templateUrl: "views/commodity/createCommodity.view.client.html",
                controller: "CommodityCreateController",
                controllerAs: "model"
            })
            .when("/createVariety", {
                templateUrl: "views/variety/createVariety.view.client.html",
                controller: "VarietyCreateController",
                controllerAs: "model"
            })

            .when("/addtocart/:varietyname", {
                templateUrl: "views/addtocart/addtocart.view.client.html",
                controller: "AddToCartController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedInBuyer
                }
            })

            .when("/checkout", {
                templateUrl: "views/checkout/checkout.view.client.html",
                controller: "CheckOutController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedInBuyer
                }

            })

            .when("/thankyou/:sellername", {
                templateUrl: "views/finalpage/finalpage.view.client.html",
                controller: "FinalPageController",
                controllerAs: "model"

            })

            .when("/thankyou", {
                templateUrl: "views/thankyou/thankyou.view.client.html",
                controller: "FinalPageController",
                controllerAs: "model"


            })



            .otherwise({
                redirectTo: "/mainpage"
            });

        function checkLoggedInBuyer($q, $location,$rootScope, BuyerService) {
            var deferred = $q.defer();

            BuyerService
                .loggedInBuyer()
                .then(
                    function (response) {
                        var buyer = response.data;
                        if(buyer == '0'){
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/loginBuyer");
                        } else {
                            $rootScope.currentUser = buyer;
                            deferred.resolve();
                        }
                    },
                    function (error) {
                        $location.url("/loginBuyer");
                    }
                );

            return deferred.promise;
        };



    }
})();

