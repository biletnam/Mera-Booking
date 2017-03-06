'use strict';

module.exports = function($scope,$rootScope,$log, $http,$location) {
  $scope.booking =$rootScope.confirmpage;
var arr=[];
  console.log($scope.booking);


  var refreshConfirm = function() {
  $http.get('/con/con').success(function(response) {
  console.log('CONFIRM IS SUCCESSFUL');
  $scope.Confirmlist = response;
  $scope.Confirm = "";
  });
  };
  refreshConfirm();


  $scope.ConfirmBook= function () {
      $scope.Confirm.Conbookingid=$scope.booking.bookingid;
        // $scope.Confirm.ConUser=$scope.booking.username;

    $scope.Confirm.ConTitle=$scope.booking.MovieName;
  $scope.Confirm.ConCityName=$scope.booking.CityName;
    $scope.Confirm.ConTheatreName=$scope.booking.TheatreName;
    $scope.Confirm.ConReservation=$scope.booking.Reservation;
    $scope.Confirm.ConShowtime=$scope.booking.Showtime;
    $scope.Confirm.ConAmount=$scope.booking.Amount;
    // $scope.Booked.conNoofTickets=$scope.booking.NoofTickets;
    $scope.Confirm.Conseatnumbers=$scope.booking.seatnumbers;



    $http.post('/con/con', $scope.Confirm).success(function (response) {
               console.log(response);
              //  console.log($scope.Confirm)
   alert("Your booking is successful....Thank you")
               $location.path('/home');
              // $route.reload();

           });





   };
  };
