'use strict';

module.exports = function() {

   var movieList = [];

  var addMovie = function(newObj) {
      movieList.push(newObj);
  };

  var getMovies = function(){
      return movieList;
  };

  return {
    addMovie: addMovie,
    getMovies: getMovies
  };

};
