
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');


var movieSchema = mongoose.Schema({
  movieTitle:String,
  movieYear:String,
  movieLanguage: String,
   moviePoster: String,
  movieGenre: String,
  movieDirector: String,
  movieActors: String,
  avgrate:String

 });


var Movie = mongoose.model('Movie', movieSchema, 'movietable');

router.get('/movie', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Movie.find({}, function (err, docs) {
         res.json(docs);
          console.log(docs);
    });
});

router.get('/movie/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Movie.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/movie', function(req, res){
  console.log(req.body);
  var tit = req.body.Title;
  var yr = req.body.Year;
  var lan = req.body.Language;
  var post = req.body.Poster;
  var gen = req.body.Genre;
  var dir = req.body.Director;
  var act = req.body.Actors;
var avg=req.body.avgrate;
  var movie1 = new Movie({
    movieTitle: tit,
    movieYear :yr,
    movieLanguage:lan,
    moviePoster: post,
    movieGenre: gen,
    movieDirector: dir,
    movieActors: act,
    avgrate: avg

  });

  movie1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/movie/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Movie.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/movie/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Movie.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
