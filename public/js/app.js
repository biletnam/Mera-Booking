'use strict';


var angular = require('angular');
require('angular-route');
window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('angularjs-dropdown-multiselect');
require('../css/app.scss');

var app = angular.module('movieApp', [ 'ngRoute', 'angularjs-dropdown-multiselect' ]);


require('./controller');
require('./service');

app.config(function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
  })

  .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'LogoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController',
      access: {restricted: false}
    })
  .when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminController',
    access: {restricted: true}})

  .when('/reviews', {
    templateUrl: 'views/reviews.html',
    controller: 'ReviewController',
  })
  .when('/trailer', {
    templateUrl: 'views/trailer.html',
    controller: 'TrailerController',
  })
  .when('/movies', {
    templateUrl: 'views/movies.html',
    controller: 'MovieController',
  })
   .when('/cancellation', {
      templateUrl: 'views/cancellation.html',
      controller: 'CancellationController',
    })
    .when('/confirm', {
       templateUrl: 'views/confirm.html',
       controller: 'ConfirmController',
     })
  .otherwise({
    redirectTo: '/',
  });
});

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});


app.filter('unique', function() {

   return function(collection, keyname) {

      var output = [],
          keys = [];


      angular.forEach(collection, function(item) {

          var key = item[keyname];

          if(keys.indexOf(key) === -1) {

              keys.push(key);

              output.push(item);
          }
      });

      return output;
   };

   app.directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "dd/mm/yy",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
});
});
