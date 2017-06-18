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
                .login(username, password)
                .then(login);
            function login(found) {
                if (found !== "Error:404") {
                    $location.url('/profile');
                } else {
                    model.message = "sorry, please check username and password. please try again!";
                }
            }
        }

    }
})();