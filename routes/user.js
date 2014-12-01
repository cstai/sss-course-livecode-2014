var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
  if(!req.session.username){
    res.redirect(req.baseUrl + "/login");
  }
  res.send("Logged in!");
});

router.get("/login", function(req, res){
  var data = {
    req: req,
    error: null
  }
  res.render("user/login", data);
})

router.post("/login", function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  if(username === "flurin" && password === "secret"){
    req.session.username = username;
    res.redirect(req.baseUrl + "/");
  } else {
    var data = {
      req: req,
      error: "Oh noes!"
    }
    res.render("user/login", data);
  }

})

module.exports = router;