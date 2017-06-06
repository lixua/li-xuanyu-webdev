/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams,
                                   websiteService,$location) {
        var model = this;

        model.userId = $routeParams['uid'];

        function init() {
            model.websites = websiteService
                    .findWebsitesByUser(model.userId)
                .then(renderWebsites);
            function renderWebsites(found){
                model.websites = found;
            }


        }
        init();

    }
})();