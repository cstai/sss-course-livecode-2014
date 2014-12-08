var express = require('express');
var router = express.Router();
var fs = require('fs');

var filesPath = __dirname + "/../files/";

router.use(function(req, res, next){
  res.locals.req = req;
  next();
});

router.get("/", function(req, res){
  fs.readdir(filesPath, function(err, files){
    res.locals.files = files;
    res.render("files/index");
  })
});

router.get("/download/:filename", function(req, res){
  var filePath = filesPath + req.params.filename;
  fs.exists(filePath, function (exists) {
    if(exists){
      res.sendFile(req.params.filename, {root : filesPath})
    } else {
      res.send("No such file: " + req.params.filename);
    }
  });
});

router.get("/upload", function(req, res){
  res.render("files/upload");
});

router.post("/upload", function(req, res){
  var upload = req.files.upload;

  fs.rename(upload.path, filesPath + upload.originalname, function(err){
    if(err){
      res.send("Something went wrong!");
    } else {
      res.redirect(req.baseUrl + "/");
    }
  })
});

module.exports = router;