/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);
    function pageListController($routeParams,
                                   pageService,$location) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];


        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);

        }
        init();

    }
})();