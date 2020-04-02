var Blog = require("../models/blog");
var Comment = require("../models/comment");

var middlewareObj = {}; 

middlewareObj.checkBlogOwnership = function(req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
        Blog.findById(req.params.id,function(err,foundBlog){
            if(err){
                console.log(err);
                res.redirect("back");
            } else{
                //does the user owns the blog
                if(foundBlog.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error","You don't have the permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error","You need to be logged in to do that.");
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function(req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            } else{
                //does the user owns the comment
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                } else{
                    req.flash("error","You don't have the permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","You need to be logged in to do that.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;