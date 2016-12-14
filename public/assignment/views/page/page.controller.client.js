/**
 * Created by Soumya on 10/16/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function PageListController($location, $routeParams, PageService,WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId=$routeParams['pid'];

        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                    console.log(vm.pages);
                });
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                    console.log(vm.websites);
                });
        }
        init();

    }



    function NewPageController($routeParams, PageService,WebsiteService,$location) {
        var vm = this;
        vm.createPage=createPage;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                });
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                    console.log(vm.websites);
                });
        }
        init();

        function createPage(name,title) {
            vm.error = null;
            if (name == null || name === ""){
                vm.error = "All details must be entered";
            } else {
                var page = {
                    "_website": vm.websiteId,
                    "name": name,
                    "title": title
                };
                PageService
                    .createPage(vm.websiteId,page)
                    .then(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    });
            }
        }


    }

    function EditPageController($routeParams, PageService,WebsiteService,$location) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId=$routeParams['pid'];
        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                })
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                })
        }
        init();

        function updatePage(pageId,page) {
            vm.error = null;
            if(page.name == null || page.name === ""){
                vm.error = "All details must be entered"
            } else {
                PageService
                    .updatePage(pageId,page)
                    .then(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    });
            }
        }




        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        }
    }
})();
