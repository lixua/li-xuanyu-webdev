/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                               $location,
                               pageService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.updatePage = updatePage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function updatePage(pageName, pageDescription) {
            if(pageName === null || pageName === '' || typeof pageName === 'undefined') {
                model.error = 'Name is required';
                return;
            } else {
                if (typeof pageDescription === 'undefined'){
                    pageDescription = '';
                }
                var page = {}
                page.name = pageName;
                page.websiteId = model.websiteId;
                page.description = pageDescription
                pageService.updatePage(model.pageId,page);
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
            }


        }
    }
})();