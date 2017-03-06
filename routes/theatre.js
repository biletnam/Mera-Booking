
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true })); //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
// router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');
// var dbHost = 'mongodb://localhost:27017/test';
// mongoose.connect(dbHost);

// var movieSchema = mongoose.Schema({
//   movieID: String,
//   movieName: String
//  });

var theatreSchema = mongoose.Schema({
  // theaterID:Number,
  theatreName: String,
  // theatreCity: String,
  theatreShowTiming:String,
  theatrelocation: String
 });
// var Movie = mongoose.model('Movie', movieSchema, 'movietable');

var theatre = mongoose.model('theatre', theatreSchema, 'theatretable');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(){
//   console.log("Connected to DB");
// });


router.get('/t', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    theatre.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/t/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     theatre.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/t', function(req, res){
  console.log(req.body);
  // var id = req.body.theaterID;
  var name = req.body.theatreName;
  // var city = req.body.City;
  var shtm = req.body.theatreShowTiming;
  var lc= req.body.theatrelocation;

  var theatreinfo = new theatre({
    // theaterID: id,
    theatreName :name,
    // City: city,
    theatreShowTiming: shtm,
    theatrelocation: lc
  });

  theatreinfo.save(function(err, docs){
    if ( err ) throw err;
    console.log("Theatre Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/t/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      theatre.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/t/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    theatre.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
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
