/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                  $location,
                                  websiteService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.website = websiteService.findWebsiteById(model.websiteId);
        model.updateWebsite = updateWebsite


        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();
        function updateWebsite(websiteName, websiteDescription){

            if(websiteName === null || websiteName === '' || typeof websiteName === 'undefined') {
                model.error = 'Name is required';
                return;
            } else {
                if (typeof websiteDescription === 'undefined'){
                    websiteDescription = '';
                }
                var website = {}
                website.name = websiteName;
                website.description = websiteDescription;
                website.developerId = model.userId;
                websiteService.updateWebsite(model.websiteId,website);
                $location.url('/user/' + model.userId + '/website');
            }

        }


    }
})();