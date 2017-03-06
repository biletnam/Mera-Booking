'use strict';

var app = require('angular').module('movieApp');

app.service('MovieList', require('./movie-list-service'));
app.service('TodoService', require('./todos'));
app.service('CityService',  require('./city-service'));
app.service('TheatreService',  require('./theatre-service'));
app.service('AuthService',  require('./auth-service'));


