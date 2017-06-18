/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams,currentUser, userService) {
        var model = this;

        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.user = currentUser;
        model.logout = logout;
        model.user.password2 = model.user.password;
        function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/login')
                })
        }

        function updateUser(username, password, password2, firstName, lastName, email) {
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if (password !== password2|| password === null || typeof password === 'undefined') {
                model.error = "must have passwords";
                return;
            }

            var found = userService.findUserByUsername(username);
            if (typeof(found._id) === 'undefined' || found._id === model.userId) {
                var newUser = {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                };
                userService.updateUser(model.userId, newUser);
                $location.url('/profile');

            } else {
                model.error = "sorry, that username is taken";

            }

        }
        function deleteUser(password1, password2){
            if (password1 !== password2){
                model.error = "passwords must be verified to delete account";
                return;
            } else {
                userService.deleteUser(model.userId);
                $location.url('/login');
            }

        }
    }

})();