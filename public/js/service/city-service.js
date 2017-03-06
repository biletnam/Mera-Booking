
'use strict';
City.$inject = ['$http'];


function City($http){
   var _this = this;
    _this.getCity = function () {
        
         return $http({
            method: 'GET',
            url: '/city/getCity',            
        })
        .then(function(response) {
            console.log(response);
            return response.data;
        })
        .catch(function(error) {
           
            throw error;
        });
    };

    _this.addCity = function (data) {
        //console.log($scope.city);
         return $http({
            method: 'POST',
            url: '/city/addCity',
            data: data,

        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {           
            throw error;
        });
    };

    _this.deleteCity = function (cityID) {
        //console.log($scope.city);
          return $http.delete('/city/deleteCity/'+cityID)

        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {            
            throw error;
        });
    };

     _this.editCity = function (cityID) {
        //console.log($scope.city);
          return $http({
            method: 'GET',
            url: '/city/getCity/'+cityID,            
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
           
            throw error;
        });
    };

    _this.updateCity = function (cityID, city) {
        //console.log($scope.city);
          return $http({
            method: 'PUT',
            url: '/city/updateCity/'+cityID,  
            data: city          
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
           
            throw error;
        });
    };
}
module.exports = City;
   
//     var addCity = function ($scope, $http) {
//         //console.log($scope.city);
//         $http.post('/city/addCity', $scope.city).success(function (response) {
//             console.log(response);
//             console.log("CREATE IS SUCCESSFUL");
           
//         });
//     };

//     var deleteCity = function (id) {
//         console.log(id);
//         $http.delete('/city/deleteCity/' + id._id).success(function (response) {
//             console.log(response);
//             console.log('DELETED SUCCESSFULLY');
            
//         });
//     };

//     var editCity = function (id) {
//          $http.get('/city/getCity/' + id._id).success(function (response) {
//            // $scope.city = response[0];
//         });
//     };

//     var updateCity = function () {
//         console.log("REACHED UPDATE");
//         console.log($scope.city._id);
//         // $http.put('/city/updateCity/' + $scope.city._id, $scope.city).success(function (response) {
//         //     console.log(response);
//         //     refresh();
//         // })
//     }

//   return {
//     addCity: addCity,
//     getCities: getCities,
//     updateCity: updateCity,
//     deleteCity: deleteCity
//   };

// };
