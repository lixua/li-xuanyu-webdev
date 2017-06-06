(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

        function register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if (password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(renderUser);
            function renderUser(found){
                if(!found){
                    var newUser = {
                        username: username,
                        password: password
                    };
                    return userService
                        .createUser(newUser)
                        .then(function (user) {
                            $location.url('/user/' + user._id);
                    });
                } else {
                    model.error = "sorry, that username is taken";
                }
            }



        }
    }
})();