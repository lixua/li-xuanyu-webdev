/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                $location,
                                pageService,currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.updatePage = updatePage;
        model.deletePage = deletePage;
        function init(){

            model.page = pageService
                .findPageById(model.pageId)
                .then(renderPage);
            function renderPage(found) {
                model.page = found;
            }
        }

        init();

        function deletePage() {

            pageService.deletePage(model.pageId);
            $location.url('/website/' + model.websiteId + '/page');
        }


        function updatePage(pageName, pageDescription) {
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
                pageService.updatePage(model.pageId, page);
                $location.url('/website/' + model.websiteId + '/page');
            }


        }
    }
})();