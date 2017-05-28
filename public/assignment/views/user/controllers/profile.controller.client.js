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
        model.user = userService.findUserById(model.userId);
        model.updateUser = updateUser;

        function updateUser(username,password,password2,firstName,lastName,email){
            console.log("2222222")
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            var found = userService.findUserByUsername(username);
            if(found !== null && found._id != model.userId) {
                model.error = "sorry, that username is taken";
            } else {
                var newUser = {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                };
                userService.updateUser(model.userId,newUser);
                $location.url('/user/' + newUser._id);

            }

        }
    }

})();