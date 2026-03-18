var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require("./users")



const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile', function(req, res){
  res.send('Welcome to profile');
})



router.post("/register", function(req, res){
  var userdata = new userModel({
    username: String,
    secret: String
  });

  userModel.register(userdata,req.body.password)
  .then(function(registerduser){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile");
    })
  })
});
module.exports = router;
