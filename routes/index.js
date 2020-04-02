var express = require("express");
var router= express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root Route
router.get("/",function(req,res){
    res.render("landing");
});


//REGISTER Routes

//Show register form
router.get("/register",function(req,res){
    res.render("register");
});

//handle signup logic
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            req.flash("error",err);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/blogs");
        });
    });
});

//LOGIN Routes
//show login form
router.get("/login",function(req,res){
    res.render("login");
});

//handle login logic
router.post("/login",passport.authenticate("local",
{
    successRedirect: "/blogs",
    failureRedirect: "/login"
}),function(req,res){

});

//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you Out");
    res.redirect("/");
}); 

module.exports = router;