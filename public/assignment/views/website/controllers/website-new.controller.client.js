/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  websiteService,currentUser) {

        var model = this;

        model.userId = currentUser._id;
        model.createWebsite = createWebsite;
        function init() {
            model.websites = websiteService
                .findWebsitesByUser(model.userId)
                .then(renderWebsites);
            function renderWebsites(found) {
                model.websites = found;
            }
        }

        init();

        function createWebsite(websiteName, websiteDescription) {
            if (websiteName === null || websiteName === '' || typeof websiteName === 'undefined') {
                model.error = 'Name is required';
                return;
            } else {
                if (typeof websiteDescription === 'undefined') {
                    websiteDescription = '';
                }
                var website = {}
                website.name = websiteName;
                website.description = websiteDescription;
                website.developerId = model.userId;
                websiteService.createWebsite(model.userId, website);
                $location.url('/website');
            }


        }
    }
})();