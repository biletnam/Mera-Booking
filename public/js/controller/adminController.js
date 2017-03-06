
'use strict';

module.exports = function($scope, $http, $log) {

  var self = this;
   self.submit = function() {
       console.log('Form is submitted with following user');
  };

  $scope.f=function()
  {
    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
  var day = currentTime.getDate()
  var year = currentTime.getFullYear()
  var cvalue=day + "/" + month + "/" + year;
  // alert(cvalue);
  console.log(cvalue);
    var dvalue=document.getElementById("date").value;
    // alert(dvalue);
    console.log(dvalue);
    // if(cvalue < dvalue)
    // {
    //   // alert("future date");
    // }
    // else
    // {
    //   alert("past date");
    // }

  }


    var refreshShow = function () {
          $http.get('/sh/sh').success(function (response) {
              console.log('READ IS SUCCESSFUL');
              $scope.showtimelist = response;
              $scope.showtime = "";
          });
      };

      refreshShow();


      $('#add').click(function(){
                 var data = ($('#selecttime').val());
                 $('#time').append("<option value='"+data+"'>"+data+"</option>");

             });


      $scope.addShow = function () {
          console.log($scope.showtime);
          $http.post('/sh/sh', $scope.showtime).success(function (response) {
              console.log(response);
              console.log("CREATE IS SUCCESSFUL");
              refreshShow();
          });
      };

      $scope.removeShow = function (id) {
          console.log(id);
          $http.delete('/sh/sh/' + id._id).success(function (response) {
              console.log(response);
              console.log('DELETED SUCCESSFULLY');
              refreshShow();
          });
      };

      $scope.editShow = function (id) {
           $http.get('/sh/sh/' + id._id).success(function (response) {
              $scope.showtime = response[0];
          });
      };

      $scope.updateShow = function () {
          console.log("REACHED UPDATE");
          console.log($scope.showtime._id);
          $http.put('/sh/sh/' + $scope.showtime._id, $scope.showtime).success(function (response) {
              console.log(response);
              refreshShow();
          })
      }

        var refreshCity = function () {
              $http.get('/c/c').success(function (response) {
                  $scope.citieslist = response;
                  console.log('READ IS SUCCESSFUL');
                  $scope.cities = "";
              });
          };

          refreshCity();

          $scope.addCity = function () {
              console.log($scope.cities);
              $http.post('/c/c', $scope.cities).success(function (response) {
                  console.log(response);
                  console.log("CREATE IS SUCCESSFUL");
                  refreshCity();
              });
          };

          $scope.removeCity = function (id) {
              console.log(id);
              $http.delete('/c/c/' + id._id).success(function (response) {
                  console.log(response);
                  console.log('DELETED SUCCESSFULLY');
                  refreshCity();
              });
          };

          $scope.editCity = function (id) {
               $http.get('/c/c/' + id._id).success(function (response) {
                  $scope.cities = response[0];
              });
          };

          $scope.updateCity = function () {
              console.log("REACHED UPDATE");
              console.log($scope.cities._id);
              $http.put('/c/c/' + $scope.cities._id, $scope.cities).success(function (response) {
                  console.log(response);
                  refreshCity();
                })
              }


      var refreshThrr = function () {
            $http.get('/t/t').success(function (response) {
                console.log('READ THEATRE SUCCESSFUL');
                $scope.thtrslist = response;
                $scope.thtrs = "";
            });
        };

        refreshThrr();

        $scope.addThrr = function () {
            console.log($scope.thtrs);
            $http.post('/t/t', $scope.thtrs).success(function (response) {
                console.log(response);
                console.log("CREATE THEATRE SUCCESSFUL");
                refreshThrr();
            });
        };

        $scope.removeThrr = function (id) {
            console.log(id);
            $http.delete('/t/t/' + id._id).success(function (response) {
                console.log(response);
                console.log('DELETED THEATRE SUCCESSFULLY');
                refreshThrr();
            });
        };

        $scope.editThrr = function (id) {
             $http.get('/t/t/' + id._id).success(function (response) {
                $scope.thtrs = response[0];
            });
        };

        $scope.updateThrr = function () {
            console.log("REACHED THEATRE UPDATE");
            console.log($scope.thtrs._id);
            $http.put('/t/t/' + $scope.thtrs._id, $scope.thtrs).success(function (response) {
                console.log(response);
                refreshThrr();
            })
        }


          $scope.removem = function (id) {
              console.log(id);
              $http.delete('/movie/movie/' + id._id).success(function (response) {
                  console.log(response);
                  console.log('DELETED MOVIE SUCCESSFULLY');
                  refreshm();
              });
          };

          $scope.editm = function (id) {
               $http.get('/movie/movie/' + id._id).success(function (response) {
                  $scope.mov= response[0];
              });
          };

          $scope.updatem = function () {
              console.log("REACHED MOVIE UPDATE");
              console.log($scope.mov._id);
              $http.put('/movie/movie/' + $scope.mov._id, $scope.mov).success(function (response) {
                  console.log(response);
                  refreshm();
              })
          }
          var refresh = function() {
      $http.get('/movie/movie').success(function(response) {
          console.log('READ IS SUCCESSFUL');
          $scope.moviList = response;
          $scope.mov = "";
      });
  };

  refresh();

  $scope.addm = function(mov) {
      $http.get(`http://www.omdbapi.com/?t=${mov.movieTitle}&plot=short&r=json`).success(function(response) {
          //console.log(response);
          var movieObj = {};
          for (var key in response) {
              if (key == 'Title' || key == 'Year' || key == 'Language' || key == 'Poster' || key == 'Genre' || key == 'Director' || key == 'Actors' ) {
                  movieObj[key] = response[key];

              }
          }


          $http({
                  method: 'POST',
                  url: '/movie/movie',
                   headers: {'Content-Type': 'application/json'},
                  data: movieObj
              })
              .then(function(response) {
                  console.log(response);
                  console.log("CREATE IS SUCCESSFUL");
                  $log.info(response);
                  refresh();
              });




      });
      console.log($scope.movi);

  };


  var refreshmps = function () {
        $http.get('/map/map').success(function (response) {
            console.log('READ THEATRE SUCCESSFUL');
            $scope.mapplist = response;
            $scope.mapp = "";
        });
    };

    refreshmps();

    $('#add').click(function(){
                var data = ($('#selecttime').val());
                $('#time').append("<option value='"+data+"'>"+data+"</option>");

            });

    $scope.addmps = function () {
        console.log($scope.mapp);
        $http.post('/map/map', $scope.mapp).success(function (response) {
            console.log(response);
            console.log("CREATE MAPPING SUCCESSFUL");
            refreshmps();
        });
    };

    $scope.removemps = function (id) {
        console.log(id);
        $http.delete('/map/map/' + id._id).success(function (response) {
            console.log(response);
            console.log('DELETED MAPPING SUCCESSFULLY');
            refreshmps();
        });
    };

    $scope.editmps = function (id) {
         $http.get('/map/map/' + id._id).success(function (response) {
            $scope.mapp = response[0];
        });
    };

    $scope.updatemps = function () {
        console.log("REACHED MAPPING UPDATE");
        console.log($scope.mapp._id);
        $http.put('/map/map/' + $scope.mapp._id, $scope.mapp).success(function (response) {
            console.log(response);
            refreshmps();
        })
    }
    $('#add').click(function(){
                var data = ($('#selecttime').val());
                $('#time').append("<option value='"+data+"'>"+data+"</option>");

            });




};
