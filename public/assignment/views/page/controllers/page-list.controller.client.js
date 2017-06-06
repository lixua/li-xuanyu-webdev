/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);
    function pageListController($routeParams,
                                pageService) {

        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        function init() {

            model.pages = pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            function renderPages(found) {
                model.pages = found;
            }

        }

        init();

    }
})();