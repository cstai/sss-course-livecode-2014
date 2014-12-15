var express = require('express');
var router = express.Router();
var signupRouter = require('./user_signup');

router.use("/signup", signupRouter);

router.route("/*").get(function(req, res, next){
  if(req.path == "/login"){
    return next();
  }

  if(!req.session.userId){
    res.redirect(req.baseUrl + "/login");
  } else {
    req.getConnection(function(err, connection){
      if(err){ next(err); }
      connection.query("SELECT * FROM users WHERE id = ?", [req.session.userId], function(err, records){
        if(err){ next(err); }

        res.locals.user = records[0];
        next();
      })
    })
  }
});

router.get("/", function(req, res, next){
  res.render("user/index");
});

router.get("/welcome", function(req, res, next){
  res.render("user/welcome");
});

router.get("/login", function(req, res){
  var data = {
    req: req,
    error: null
  }
  res.render("user/login", data);
})

router.post("/login", function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  req.getConnection(function(err, connection){
    if(err){ next(err); }

    connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [username, password], function(err, records){
      if(err){ next(err); }

      if(records.length > 0){
        req.session.userId = records[0].id;
        console.log("Logged in! HOORAY", records[0]);
        res.redirect(req.baseUrl + "/");
      } else {
        var data = {
          req: req,
          error: "Oh noes!"
        }
        res.render("user/login", data);
      }
    });

  });

})

module.exports = router;