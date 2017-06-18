/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService,currentUser) {


        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['wid'];
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;
        function init() {
            model.websites = websiteService
                .findWebsitesByUser(model.userId)
                .then(renderWebsites);
            function renderWebsites(found) {
                model.websites = found;
            }
            model.website = websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);
            function renderWebsite(found) {
                model.website = found;
            }


        }

        init();

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url('/website');
        }


        function updateWebsite(websiteName, websiteDescription) {

            if (websiteName === null || websiteName === '' || typeof websiteName === 'undefined') {
                model.error = 'Name is required';
                return;
            } else {
                if (typeof websiteDescription === 'undefined') {
                    websiteDescription = '';
                }
                var website = {};
                website.name = websiteName;
                website.description = websiteDescription;
                website.developerId = model.userId;
                websiteService.updateWebsite(model.websiteId, website);
                $location.url('/website');
            }

        }


    }
})();