var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');


var confirmSchema = mongoose.Schema({

   Conbookingid:String,
   ConUser:String,
    ConTitle: String,
    ConCityName: String,
    ConTheatreName: String,
     ConShowtime: String,
     ConReservation: String,
    //  NoofTickets:String,
    Conseatnumbers: String,
    ConAmount: String,
    Conmail: String

});
var Confirm = mongoose.model('Confirm', confirmSchema, 'confirmtable');

router.get('/con', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Confirm.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});

router.get('/con/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Confirm.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/con', function(req, res){

  console.log(req.body);
    var cbkid = req.body.Conbookingid;
    //  var cuser = req.body.ConUser;
    var names = req.body.ConTitle;
    var cn=req.body.ConCityName;
    var tlo= req.body.ConTheatreName;
    var stme = req.body.ConShowtime;
    var dt = req.body.ConReservation;
    // var tk = req.body.NoofTickets;
    var cns=req.body.Conseatnumbers;
    var amts=req.body.ConAmount;
    var cmal= req.body.Conmail;

    // var rs=req.body.res;
   var Confirm1 = new Confirm({
     Conbookingid:cbkid,
    //  ConUser:cuser,
  ConTitle : names,
    ConCityName:cn,
   ConTheatreName:tlo,
    ConShowtime:stme,
    ConReservation:dt,
    // NoofTickets:tk,
    Conseatnumbers:cns,
    ConAmount:amts,
    Conmail: cmal
  });

  Confirm1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/con/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Confirm.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/con/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Confirm.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
module.exports = router;
