/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService() {

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };


        function createUser(user) {
            user._id = parseInt(users[users.length - 1]._id) + 1 + "";
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            var result = users.find(function (user) {
                return user._id === userId;
            });
            if (typeof result === 'undefined') {
                return null;
            } else {
                return result;
            }
        }

        function findUserByUsername(username) {
            var result = users.find(function (user) {
                return user.username === username;
            });
            if (typeof result === 'undefined') {
                return null;
            } else {
                return result;
            }
        }

        function updateUser(userId, user) {
            var temp = findUserById(userId);
            user._id = userId;
            users[users.indexOf(temp)] = user
        }

        function deleteUser(userId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index, 1);
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }


    }
})();
