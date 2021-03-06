/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "home.html"
            })
            /*
             user pages
             */
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"

            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })

            /*
             website pages
             */
            .when("/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when("/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when("/website/:wid", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })

            /*
             page pages
             */
            .when("/website/:wid/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when("/website/:wid/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when("/website/:wid/page/:pid", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })

            /*
             widget pages
             */
            .when("/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when("/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/templates/widget-choose.view.client.html",
                controller: "widgetChooseController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when("/website/:wid/page/:pid/widget/:wgid/", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when("/website/:wid/page/:pid/widget/:wgid/flickr", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when("/website/:wid/page/:pid/widget//flickr", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedIn
                }
            })



    }
    function checkLoggedIn(userService, $q, $location){
        var deferred = $q.defer();
        userService
            .loggedIn()
            .then(function(user){
                if(user ==='0'){
                    deferred.reject();
                    $location.url('/login')
                } else {
                    deferred.resolve(user);
                }
            })
        return deferred.promise;
    }
})();

