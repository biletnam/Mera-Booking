'use strict';

module.exports = function($scope, $http,$location) {
  $scope.cancel = 'cancellation';
    $scope.showd=false;
  $scope.booking="";
  var i;
  $scope.cancellationId="";
$scope.getcancel=function () {
  $scope.showd=true;
  $http.get('/con/con').success(function(response) {
  $scope.confirmlist = response;
  for(i=0;i<$scope.confirmlist.length;i++)
  {
if($scope.confirmlist[i].Conbookingid==$scope.idNo && $scope.confirmlist[i].ConTitle==$scope.movie)
{
  $scope.cancellation=$scope.confirmlist[i];
  console.log($scope.idNo);
           console.log($scope.movie);

           $scope.cancellist = response[i];
           $scope.cancel = "";
           console.log(response[i]);
}}});
}
$scope.cancelBook=function(id){
  $http.delete('/con/con/'+id._id).success(function(response){
  console.log(response);
  alert("cancelled successfully");
  $location.path('/home');
});
}
};
