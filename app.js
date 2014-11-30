var express = require('express');
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

var weatherRouter = require('./routes/weather');

app.use("/weer", weatherRouter);

app.get("/", function(req, res){
  var data = {
    name : "Flurin"
  };
  res.render("index", data);
});

app.listen("3000", function(){
  console.log("really started");
});

console.log("Started?");