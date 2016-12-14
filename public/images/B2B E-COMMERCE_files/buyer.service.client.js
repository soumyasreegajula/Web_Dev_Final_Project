(function(){
    angular
        .module("WebAppMaker")
        .factory("BuyerService", BuyerService);

    function BuyerService($http) {


        var api = {
            loginBuyer: loginBuyer,
            logoutBuyer: logoutBuyer,
            registerBuyer: registerBuyer,
            loggedInBuyer: loggedInBuyer,
            findBuyerByCredentials: findBuyerByCredentials,
            findBuyerById: findBuyerById,
            createBuyer: createBuyer,
            findBuyerByBuyername: findBuyerByBuyername,
            updateBuyer: updateBuyer,
            deleteBuyer: deleteBuyer,
            addtocart:addtocart,
            findSellerByName:findSellerByName,
            findCartDetails:findCartDetails,
            addtobought:addtobought,
            subscribe: subscribe,
            subscribeseller: subscribeseller,
            findSubscriberDetails:findSubscriberDetails
        };
        return api;

        function registerBuyer(username,password, role) {
            var buyer = {
                username: username,
                password: password,
                role: role
            };
            return $http.post("/api/registerBuyer", buyer);
        }

        function loggedInBuyer() {
            return $http.get('/api/loggedInBuyer');
        }

        function logoutBuyer(buyer) {

            return $http.post("/api/logoutBuyer");
        }

        function loginBuyer(username,password) {
            var buyer = {
                username: username,
                password: password
            };

            return $http.post("/api/loginBuyer", buyer);
        }

        function deleteBuyer(buyerId) {
            var url = "/api/buyer/"+ buyerId;
            return $http.delete(url);
        }

        function updateBuyer(buyerId,newBuyer) {
            var url = "/api/buyer/" + buyerId;
            return $http.put(url, newBuyer);
        }

        function addtocart(varietyname,sellername,quantity) {
            var cart = {
                varietyname: varietyname,
                sellername: sellername,
                quantity: quantity
            };
            console.log("cart");
            console.log(cart);

            var url = "/api/cart";
            return $http.post(url, cart);
        }

        function createBuyer(newBuyer){
            return $http.post("/api/buyer",newBuyer);
        }

        function findBuyerByBuyername(username){
            var url = "/api/buyer?username="+username;
            return $http.get(url);
        }

        function findBuyerById(buyerId) {
            var url = "/api/buyer/" + buyerId;

            return $http.get(url);
        }

        function findBuyerByCredentials(username, password) {
            var url = "/api/buyer?username="+username+"&password="+password;
            return $http.get(url);
        }

        function findSellerByName(varietyname){
            var url = "/api/seller/"+varietyname;
            return $http.get(url);
        }
        function findCartDetails(){
            console.log("client cart");
            var url = "/api/cartdetails";
            return $http.get(url);
        }

        function findSubscriberDetails(){
            var url = "/api/subdetails";
            return $http.get(url);
        }

        function addtobought(sellername, varietyname, quantity) {

            var bought = {
                sellername: sellername,
                varietyname: varietyname,
                quantity: quantity
            };

            var url = "/api/purchases"
            return $http.post(url, bought);
        }

        function subscribe(sellername) {
            var url = "/api/subscribe/" + sellername;
            return $http.get(url);
        }

        function subscribeseller(sellername) {
            var url = "/api/subscribeseller/" + sellername;
            return $http.get(url);
        }
    }

})();