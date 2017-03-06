var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }))

var mongoose = require('mongoose');


var bookingSchema = mongoose.Schema({
    bookingid:String,
     MovieName:String,
    CityName:String,
    TheatreName:String,
     Showtime:String,
     Reservation:String,
    //  NoofTickets:String,
    seatnumbers:String,
    Amount:String

});

var Book = mongoose.model('Book', bookingSchema, 'book');

router.get('/bk', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Book.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});

router.get('/bk/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Book.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/bk', function(req, res){

  console.log(req.body);
    var id=req.body.bookingid;
    var name = req.body.MovieName;
    var cname=req.body.CityName;
    var tloc = req.body.TheatreName;
    var stime = req.body.Showtime;
    var dat = req.body.Reservation;
    // var tk = req.body.NoofTickets;
    var cn=req.body.seatnumbers;
    var amt=req.body.Amount;

    // var rs=req.body.res;
   var Booking = new Book({
    bookingid:id,
    MovieName:name,
    CityName:cname,
   TheatreName:tloc,
    Showtime:stime,
    Reservation:dat,
    // NoofTickets:tk,
    seatnumbers:cn,
    Amount:amt

  });

  Booking.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/bk/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Book.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/bk/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Book.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
module.exports = router;
