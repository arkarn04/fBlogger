var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware/index.js");



//INDEX-show all blogs
router.get("/blogs",function(req,res){
    Blog.find({},function(err,foundBlogs){
        if(err){
            res.redirect("back");
        } else{
            res.render("blogs/index",{blogs:foundBlogs});
        }
    });  
});

//NEW-show new form
router.get("/blogs/new",middleware.isLoggedIn,function(req,res){
    res.render("blogs/new");
});

//CREATE-to create new blog route
router.post("/blogs",middleware.isLoggedIn,function(req,res){
    //get data from form
    var title = req.body.title;
    var image = req.body.image;
    var content = req.body.content;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBlog = {title: title,content: content,image: image,author: author};
    Blog.create(newBlog,function(err,newlyCreated){
        if(err){
            req.flash("error","Something went wrong");
            res.redirect("back");
        } else{
            req.flash("success","Successfully added your blog");
            //redirect to blogs
            res.redirect("/blogs");
        }
    });
});

//SHOW Route
router.get("/blogs/:id",function(req,res){
    //find the blog with provided id
    Blog.findById(req.params.id).populate("comments").exec(function(err,foundBlog){
        if(err){
            req.flash("error","Something went wrong");
            req.redirect("back");
        } else{
            res.render("blogs/show",{blog: foundBlog});
        }
    });
});

//EDIT route
router.get("/blogs/:id/edit",middleware.checkBlogOwnership, function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("back");
        } else{
            res.render("blogs/edit",{blog:foundBlog});
        }
    });
});

//UPDATE Route
router.put("/blogs/:id",middleware.checkBlogOwnership,function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,foundBlog){
        if(err){
            res.redirect("back");
        } else{
            req.flash("success","Successfully updated Blog");
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DESTROY Route
router.delete("/blogs/:id",middleware.checkBlogOwnership,function(req,res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        } else{
            req.flash("success","Removed Successfully");
            res.redirect("/blogs");
        }
    });
});

module.exports = router;