
'use strict';
Theatre.$inject = ['$http'];


function Theatre($http){
   var _this = this;
    _this.getTheatre = function () {

         return $http({
            method: 'GET',
            url: '/theatre/gettheatre',
        })
        .then(function(response) {
            console.log(response);
            return response.data;
        })
        .catch(function(error) {

            throw error;
        });
    };

    _this.addTheatre = function (data) {
        //console.log($scope.theatre);
         return $http({
            method: 'POST',
            url: '/theatre/addTheatre',
            data: data,

        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
    };

    _this.deleteTheatre = function (theatreID) {
        //console.log($scope.theatre);
          return $http.delete('/theatre/deleteTheatre/'+theatreID)

        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
    };

     _this.editTheatre = function (theatreID) {
        //console.log($scope.theatre);
          return $http({
            method: 'GET',
            url: '/theatre/getTheatre/'+theatreID,
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {

            throw error;
        });
    };

    _this.updateTheatre = function (theatre) {
        console.log(theatre);
          return $http({
            method: 'PUT',
            url: '/theatre/updateTheatre/'+theatre._id,
            data: theatre
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {

            throw error;
        });
    };
}
module.exports = Theatre;
