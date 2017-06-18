var app = require('./express');
var bodyParser = require('body-parser');
var passport = require('passport');

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


app.use(session({
    secret: process.env.MLAB_SECRET,
    resave: true,
    saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');

app.use(app.express.static(__dirname + '/public'));

require('./assignment/app');
require('./test/app')(app);
/*require('./public/project/app');

 */


app.listen(process.env.PORT || 3000);