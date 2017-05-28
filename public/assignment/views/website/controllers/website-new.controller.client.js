/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  websiteService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

        function createWebsite(websiteName,websiteDescription) {
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
                websiteService.updateWebsite(website);
                $location.url('/user/' + model.userId + '/website');
            }



        }
    }
})();