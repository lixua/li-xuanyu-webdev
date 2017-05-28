/**
 * Created by xuanyuli on 5/26/17.
 */
/**
 * Created by xuanyuli on 5/26/17.
 */


var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];


function createUser(user) {
    user._id = users[users.length - 1]._id + 1 + "";
    users.push(user);
}

function findUserById(userId) {
    return users.find(function (user) {
        return user._id === userId;
    });
}
function findUserByUsername(username) {
    return users.find(function (user) {
        return user.username === username;
    });
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
console.log(users)
var temp1 = findUserById("456")
console.log("!!!!!!!!!!!!!!!!!")
updateUser("123",temp1)
console.log(users)