(function(){
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            deleteUser: deleteUser,
            updateUser: updateUser
        };
        return api;
        function deleteUser(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return "Error";
                    }
                });
        }

        function updateUser(userId, user) {
            var url = "/api/assignment/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return "Error";
                    }
                });
        }

        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return "Error";
                    }
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/username?username="+username;
            return $http.get(url)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return "Error";
                    }
                });
        }

        function findUserById(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return "Error";
                    }
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return "Error";
                    }
                });
        }
    }
})();