/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;


        function createWebsite(userId, website) {
            var url = "/api/assignment/user/" + userId + "/website";
            return $http.post(url, website)
                .then(function (response) {
                    if (response) {
                        return response.data;
                    } else {
                        return null;
                    }
                });

        }

        function findWebsitesByUser(userId) {
            var url = "/api/assignment/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    if (response) {
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }


        function findWebsiteById(websiteId) {
            var url = "api/assignment/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    if (response) {
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }


        function updateWebsite(websiteId, website) {
            var url = "/api/assignment/website/" + websiteId;
            website._id = websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    if (response) {
                        return response.data;
                    } else {
                        return null;
                    }
                });

        }

        function deleteWebsite(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    if (response) {
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }

    }
})();