var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({extended: true}));

var weatherRouter = require('./routes/weather');

app.use("/weer", weatherRouter);

app.get("/:name?", function(req, res){
  var data = {
    name : req.params.name,
    error : false
  };
  res.render("index", data);
});

app.post("/", function(req, res){
  var name = req.body.name;

  if(name.length > 2){
    res.redirect("/" + name);
  } else {
    var data = {
      name : name,
      error : "Je moet minimaal 2 karakters invullen!"
    }

    res.render("index", data)
  }

});

app.listen("3000", function(){
  console.log("really started");
});

