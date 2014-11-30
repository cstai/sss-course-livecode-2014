var express = require('express');
var router = express.Router();

router.get("/", function(req, res){

  var data = {};

  if(req.query.location){
    data.location = req.query.location;
  } else {
    data.location = "unknown location";
  }

  res.render("weather/index", data);
})

router.get("/where/:location/:name", function(req, res){
  var location = req.params.location;
  var name = req.params.name;
  if(!name){
    name = "stranger"
  }
  res.send("Hello " + name + " from weather in " + location);
});

router.get("/rain", function(req, res){
  res.send("Uh, no rain today!");
});

module.exports = router;