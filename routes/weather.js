var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
  if(req.session.location){
    return res.redirect(req.baseUrl + "/" + req.session.location);
  }

  var data = {
    req : req,
    error: false,
    location: null
  };

  res.render("weather/index", data);
})

router.post("/", function(req, res){
  req.session.location = req.body.location;
  res.redirect(req.baseUrl + "/" + req.session.location);
})

router.get("/:location", function(req, res){
  req.session.location = req.params.location;
  res.send("Hey there in, " + req.params.location);
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