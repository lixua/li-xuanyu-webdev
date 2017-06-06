/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService($http) {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        }
        return api;


        function createPage(websiteId, page) {
            var url = "/api/assignment/website/" + websiteId + "/page";
            return $http.post(url, page)
                .then(function (response){
                    if(response){
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }

        function findPageByWebsiteId(websiteId) {
            var url = "api/assignment/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }

        function findPageById(pageId) {
            var url = "api/assignment/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }


        function updatePage(pageId, page) {
            var url = "/api/assignment/page/" + pageId;
            page._id = pageId;
            return $http.put(url, page)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }

        function deletePage(pageId) {
            var url = "/api/assignment/page/"+pageId;
            return $http.delete(url)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }


    }
})();