/**
 * Created by Soumya on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);




    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];


        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;

                });
        }
        init();
    }

    function NewWebsiteController($routeParams, WebsiteService,$location) {
        var vm = this;
        vm.createWebsite=createWebsite;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];


        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                });


        }
        init();

        function createWebsite(name,description){
            vm.error = null;
            if(name == null || name === ""){
                vm.error = "Name cannot be blank !!"
            } else {
                var newWebsite = {
                    "_user": vm.userId,
                    "name": name,
                    "description": description
                };
                WebsiteService
                    .createWebsite(vm.userId,newWebsite)
                    .then(function (response) {

                        $location.url("/user/"+ vm.userId + "/website");
                    });
            }
        }

    }




    function EditWebsiteController($routeParams, WebsiteService,$location) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;



        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];



        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;});

            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                });
        }

        init();

        function updateWebsite(website) {
            vm.error = null;
            if (website.name == null || website.name === "") {
                vm.error = "Website Name cannot be blank !!";
            } else {
                WebsiteService
                    .updateWebsite(vm.websiteId, website)
                    .then(function () {
                        $location.url("/user/" + vm.userId + "/website");
                    });
            }
        }



        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function () {
                    $location.url("/user/"+ vm.userId + "/website");
                });
        }

        function createWebsite(website){
            website._id=(new Date()).getTime();
            website.developerId=vm.userId;

            console.log(website);
            WebsiteService.createWebsite(website.developerId,website);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website/new");
        }


    }
})();



