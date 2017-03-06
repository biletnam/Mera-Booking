'use strict';

module.exports = function($scope, $http,$log, $rootScope, $location) {
$scope.m = $rootScope.bookedMovie;
var revname,j;
console.log(  $scope.m);

var reviewres=[];
var refreshrev = function () {
      $http.get('/re/re').success(function (response) {
          $scope.reviewlist = response;
          $scope.review = "";
      });
  };

  refreshrev();

  var self = this;
 self.submit = function() {
     console.log('Form is submitted with following user');
};

  // $scope.addrev = function () {
  //
  //     $scope.review.movieName=$scope.m.movieTitle;
  //     console.log($scope.review);
  //     $http.post('/re/re', $scope.review).success(function (response) {
  //         console.log(response);
  //         console.log("Rating IS SUCCESSFUL");
  //         refreshrev();
  //     });
  // };

  $scope.addrev = function () {

      $scope.review.movieName=$scope.m.movieTitle;
      console.log($scope.review);
      $http.post('/re/re', $scope.review).success(function (response) {
        revname=$scope.review.movieName;
                $http.get('/re/re').success(function (response) {
          console.log(response);
          reviewres=response;
          console.log("succesfully get data for avg rating");
        var count=0,cnt=0;
                                 var i;
                                 try
                                {
                                    for(i=0;i<=reviewres.length;i++)
                                    {
                                      if(reviewres[i].movieName== revname)
                                      {
                                        cnt++;
                                   count+=parseInt(reviewres[i].rating);
                                    }

                                    }

                                  }
                                 catch(e){}

                                  if(count>0)
                                  {
                                    $scope.ratecount=Math.round(count*100/(cnt*5));
                                    console.log($scope.ratecount);
                                    $http.get('/movie/movie').success(function(response) {
                                    console.log('READ IS SUCCESSFUL');
                                    $scope.moviList = response;
                                    $scope.mov = "";
                                    for(j=0;j<=$scope.moviList.length;j++)
                                          {
                                            if($scope.moviList[j].movieTitle== revname){
                                    console.log($scope.moviList[j]._id);

                                      $scope.moviList[j].avgrate=$scope.ratecount;
                                      console.log($scope.moviList[j]);
                                      $http.put('/movie/movie/' + $scope.moviList[j]._id, $scope.moviList[j]).success(function (response) {
                                          console.log(response);
                                          alert("Your Rating is successful")
                                          refresh5();
                                        });
                                      }
}
                                    });

                                  }
                                });

                              });

};

var refresh5 = function() {
$http.get('/movie/movie').success(function(response) {
console.log('READ IS SUCCESSFUL');
$scope.moviList = response;
$scope.mov = "";
});
};
refresh5();



};
