'use strict';

module.exports = function($scope, $http,$rootScope,$location) {
  var refresh = function() {
   $http.get('/movie/movie').success(function(response) {
   console.log('READ IS SUCCESSFUL');
   $scope.moviList = response;
   $scope.mov = "";
   });
   };
   refresh();

   var refreshmps = function () {
         $http.get('/map/map').success(function (response) {
             console.log('READ THEATRE SUCCESSFUL');
             $scope.mapplist = response;
             $scope.mapp = "";
         });
     };

     refreshmps();


   $scope.bookTicket= function (m) {
  $rootScope.bookedMovie=m;
   $location.path('/movies');
           };


           $scope.addreview= function (m) {
           $rootScope.bookedMovie=m;
           $location.path('/reviews');
                   };






};
