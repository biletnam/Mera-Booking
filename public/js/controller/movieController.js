'use strict';

module.exports = function($scope, $http, $log, $rootScope,$location) {
  $scope.m = $rootScope.bookedMovie;
$scope.seatarr=false;
  var date,amount,arr,self;
  var details=[];
  var arr=[];

  var i,j;
  $rootScope.seatArrange=[];
  console.log($scope.m);

  // var self = this;
  //  self.submit = function() {
  //      console.log('Form is submitted with following user');
  // };
  var refreshCity = function () {
        $http.get('/c/c').success(function (response) {
            $scope.citieslist = response;
            console.log('READ IS SUCCESSFUL');
            $scope.cities = "";
        });
    };

    refreshCity();




         var refreshShow = function () {
               $http.get('/sh/sh').success(function (response) {
                   console.log('READ IS SUCCESSFUL');
                   $scope.showtimelist = response;
                   $scope.showtime = "";
               });
           };

           refreshShow();





     var selected=[];
       var reserved=[];


     $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F'];
         $scope.cols = [1, 2, 3, 4, 5, 6, 7, 8 ,9 ,10 ];




         $scope.getStatus = function(seatPos) {
           if(reserved.indexOf(seatPos) > -1) {
                         return 'reserved';
                     } else if(selected.indexOf(seatPos) > -1) {
                         return 'selected';
                     }

                 }
         $scope.seatClicked=function(seatPos){
           var index = selected.indexOf(seatPos);
            if(index != -1) {
                // seat already selected, remove
                selected.splice(index, 1)
            } else {
                // new seat, push
                selected.push(seatPos);
                console.log(selected);
              }
               document.getElementById("seat no").innerHTML=selected;
         // seatClick();
         $scope.NumberOfSeats=selected.length;
        //  alert($scope.NumberOfSeats);
         amount=selected.length*200;
         document.getElementById("amt").innerHTML=amount;
         }

$scope.get=function()
{
  console.log($scope.confirmlist);
  var list=$scope.confirmlist.length;
  try
   {
  for(i=0;i<=list;i++)
  {
    if(list==0)
    {
$scope.seatarr=true;
    }
    else {
$scope.seatarr=true;
$scope.book.MovieName=$scope.m.movieTitle;
console.log($scope.book.MovieName);
console.log($scope.book.CityName);
console.log($scope.book.TheatreName);
console.log($scope.book.Reservation);
// var date1=document.getElementById("datebook").value;
// console.log(date1);
console.log($scope.book.Showtime);
     //  console.log($scope.confirmlist[i].bookingid);
      console.log($scope.confirmlist[i].ConTitle);
      console.log($scope.confirmlist[i].ConCityName);
      console.log($scope.confirmlist[i].ConTheatreName);
      console.log($scope.confirmlist[i].ConReservation);
      console.log($scope.confirmlist[i].ConShowtime);

      if ($scope.confirmlist[i].ConTitle===$scope.book.MovieName && $scope.confirmlist[i].ConCityName===$scope.book.CityName  && $scope.confirmlist[i].ConTheatreName===$scope.book.TheatreName  && $scope.confirmlist[i].ConReservation==$scope.book.Reservation && $scope.confirmlist[i].ConShowtime== $scope.book.Showtime)
  {
reserved=$scope.confirmlist[i].Conseatnumbers;
        console.log(reserved);

      }
}
}}
catch (e) {}
}



        var refreshbok = function () {
              $http.get('/bk/bk').success(function (response) {
                  console.log('READ bking SUCCESSFUL');
                  $scope.booklist = response;
                  $scope.book = "";
              });
          };

          refreshbok();

          var refreshConfirm = function () {

              $http.get('/con/con').success(function (response) {
                  console.log('Confirm READ IS SUCCESSFUL');
                  $scope.confirmlist = response;
                  $scope.confirm = "";
          });
          };

          refreshConfirm();



          $scope.addbook = function () {
            while(arr.length < 1){
              var randomnumber = Math.ceil(Math.random()*100000)
              if(arr.indexOf(randomnumber) > -1) continue;
             //  arr[arr.length] = randomnumber;
             arr.push(randomnumber);
             var id=arr;
              $scope.book.bookingid= id;
            }
            // date=document.getElementById("datebook").value;
            // console.log(date);
            // book=document.getelementById("bookid").value;
            // console.log(book);
            $scope.book.Reservation=date;
              $scope.book.MovieName=$scope.m.movieTitle;
              $scope.book.seatnumbers=selected;
            $scope.book.Amount=amount;
              console.log($scope.book);
              $http.post('/bk/bk', $scope.book).success(function (response) {
                  console.log(response);
                  console.log(" BOOKING IS SUCCESSFUL");
                  console.log($scope.book);
                $rootScope.confirmpage= $scope.book;
                  $location.path('/confirm');
                  refreshbok();
              });
          };


       var refreshThrr = function () {
                 $http.get('/t/t').success(function (response) {
                     console.log('READ THEATRE SUCCESSFUL');
                     $scope.thtrslist = response;
                     $scope.thtrs = "";
                 });
             };

             refreshThrr();


      var uniqueNames=[];
      var uniqueObj =[];
      var refreshmps = function () {
            $http.get('/map/map').success(function (response) {
                console.log('READ THEATRE SUCCESSFUL');
                $scope.mapplist = response;
                $scope.mapp = "";
        //     });
        // };

      for(j=0; j<$scope.mapplist.length;j++)
      {
        // if($scope.mapplist[i].Title==$scope.m.moviTitle)

          if(uniqueNames.indexOf($scope.mapplist[j].City) === -1){
                     uniqueObj.push($scope.mapplist[j]);
                 uniqueNames.push($scope.mapplist[j].City);
               }
             }

             console.log(uniqueNames);
             console.log($scope.cityMovie);
      });
      };

  // };


      $scope.cityMovie=uniqueNames;


        refreshmps();




};
