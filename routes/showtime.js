
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');
// var dbHost = 'mongodb://localhost:27017/test';
// mongoose.connect(dbHost);

// var movieSchema = mongoose.Schema({
//   movieID: String,
//   movieName: String
//  });

var showSchema = mongoose.Schema({
  showID:Number,
  // showName:String,
  showTiming: String,
 });
// var Movie = mongoose.model('Movie', movieSchema, 'movietable');

var show = mongoose.model('show', showSchema, 'showtable');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(){
//   console.log("Connected to DB");
// });


router.get('/sh', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");
    show.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/sh/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     show.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/sh', function(req, res){
  console.log(req.body);
  var id = req.body.showID;
  // var name = req.body.showName;
  var time = req.body.showTiming;

  var showinfo = new show({
    showID: id,
    // showName :name,
    showTiming : time
  });

  showinfo.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/sh/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      show.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/sh/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    show.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
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
