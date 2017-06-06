/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.updateUser = updateUser;
        model.user = userService
            .findUserById(model.userId)
            .then(renderUser);
        function renderUser(found){
            model.user = found;
        }

        function updateUser(username,password,password2,firstName,lastName,email){
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            var found = userService.findUserByUsername(username);
            if(typeof(found._id) == 'undefined' || found._id  == model.userId) {
                var newUser = {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                };
                userService.updateUser(model.userId,newUser);
                $location.url('/user/' + model.userId);

            } else {
                model.error = "sorry, that username is taken";

            }

        }
    }

})();