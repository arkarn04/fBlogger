var express = require("express");
var router= express.Router();
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//NEW comment- to add new comment to db
router.get("/blogs/:id/comments/new",middleware.isLoggedIn,function(req,res){
    //find blog by id
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            req.flash("error","Something went wrong");
            res.redirect("back");
        } else{
            res.render("comments/new",{blog:foundBlog});
        }
    });
});

//CREATE Route
router.post("/blogs/:id/comments",middleware.isLoggedIn,function(req,res){
     //find blog by id
     Blog.findById(req.params.id,function(err,blog){
         if(err){
             res.redirect("back");
         } else{
             //create new comment
             Comment.create(req.body.comment,function(err,comment){
                 if(err){
                    req.flash("error","Something went wrong");
                    res.redirect("back");
                 } else{
                     // add username and id to comment
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     //save comment
                     comment.save();
                     //add new comment to blog
                     blog.comments.push(comment);
                     blog.save();
                     //redirect to blog info
                     res.redirect("/blogs/" + blog._id);
                 }
             });
         }
     });
});


//EDIT comment
router.get("/blogs/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    //find the required comment
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            req.flash("error","Something went wrong");
            res.redirect("back");
        } else{
            res.render("comments/edit",{blog_id: req.params.id,comment: foundComment})
        }
    });
});

//UPDATE Comment Route
router.put("/blogs/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    //find the comment and update
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            req.flash("error","Something went wrong");
            res.redirect("back");
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    }); 
});

//DELETE Comment
router.delete("/blogs/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    //find the comment and delete
    Comment.findByIdAndRemove(req.params.comment_id,function(err,removedComment){
        if(err){
            req.flash("error","Something went wrong");
            res.redirect("back");
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});


module.exports = router;