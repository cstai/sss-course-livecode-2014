var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(multer({ dest: __dirname + "/uploads" }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: "superalkdfjalksdjflaksdjflaksdjflasd",
  resave: false,
  saveUninintialized: true
}));

var weatherRouter = require('./routes/weather');
var userRouter = require('./routes/user');
var filesRouter = require('./routes/files');

app.use("/weer", weatherRouter);
app.use("/user", userRouter);
app.use("/files", filesRouter);

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

