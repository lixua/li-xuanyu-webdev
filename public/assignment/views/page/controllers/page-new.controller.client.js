/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                               $location,
                               pageService,currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['wid'];
        model.createPage = createPage;
        function init() {


            model.pages = pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            function renderPages(found) {
                model.pages = found;
            }
        }

        init();

        function createPage(pageName, pageDescription) {
            if (pageName === null || pageName === '' || typeof pageName === 'undefined') {
                model.error = 'Name is required';
                return;
            } else {
                if (typeof pageDescription === 'undefined') {
                    pageDescription = '';
                }
                var page = {};
                page.name = pageName;
                page.websiteId = model.websiteId;
                page.description = pageDescription;
                pageService.createPage(model.websiteId, page);
                $location.url('/website/' + model.websiteId + '/page');
            }


        }
    }
})();