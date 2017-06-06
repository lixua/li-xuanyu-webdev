/**
 * Created by xuanyuli on 5/26/17.
 */

(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;
        model.login = function (username, password) {
            userService
                .findUserByCredentials(username, password)
                .then(login);
            function login(found) {
                if (found) {
                    $location.url('/user/' + found._id);
                } else {
                    model.message = "sorry, please check username and password. please try again!";
                }
            }
        }

    }
})();