var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Comment = require("./models/comment"); 

var data = [
    {
        title: "Ye Jawaani hai Dewaani",
        image:"",
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam nostrum autem minima sapiente quis, pariatur ipsa exercitationem dicta quod excepturi voluptate eaque dolores Omnis, perspiciatis fugiat nemo officia maiores quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga saepe, natus quidem dolorem aperiam voluptatem, cumque recusandae minus hic facere vitae ab error Illum commodi debitis perspiciatis sapiente quae ab! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolor veniam tempora, temporibus iste vel cum veritatis vero molestias. Amet quam beatae dicta tempora optio qui accusamus nostrum dolorem vitae Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum harum aliquid eligendi deserunt quibusdam, eum sit eos ratione labore repudiandae quasi doloremque dicta magni aspernatur. Ducimus, dolor vel."
    },
    {
        title: "Student of the year",
        image:"",
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam nostrum autem minima sapiente quis, pariatur ipsa exercitationem dicta quod excepturi voluptate eaque dolores Omnis, perspiciatis fugiat nemo officia maiores quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga saepe, natus quidem dolorem aperiam voluptatem, cumque recusandae minus hic facere vitae ab error Illum commodi debitis perspiciatis sapiente quae ab! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolor veniam tempora, temporibus iste vel cum veritatis vero molestias. Amet quam beatae dicta tempora optio qui accusamus nostrum dolorem vitae Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum harum aliquid eligendi deserunt quibusdam, eum sit eos ratione labore repudiandae quasi doloremque dicta magni aspernatur. Ducimus, dolor vel."
    },
    {
        title: "Harry Potter and the Chamber of Secrets",
        image:"",
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam nostrum autem minima sapiente quis, pariatur ipsa exercitationem dicta quod excepturi voluptate eaque dolores? Omnis, perspiciatis fugiat nemo officia maiores quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga saepe, natus quidem dolorem aperiam voluptatem, cumque recusandae minus hic facere vitae ab error? Illum commodi debitis perspiciatis sapiente quae ab! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolor veniam tempora, temporibus iste vel cum veritatis vero molestias. Amet quam beatae dicta tempora optio qui accusamus nostrum dolorem vitae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum harum aliquid eligendi deserunt quibusdam, eum sit eos ratione labore repudiandae quasi doloremque dicta magni exercitationem velit aspernatur. Ducimus, dolor vel."
    }
]


function seedDB(){
    //Remove Blogs
    Blog.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed Blogs");
        //Add a few Blogs
        data.forEach(function(seed){
            Blog.create(seed,function(err,blog){
                if(err){
                    console.log(err);
                } else{
                    console.log("Added Blogs");
                    //Create a Comment
                    Comment.create(
                        {
                            text: "This movie is my all time favourite.",
                            author: "Homer"
                        }, function(err,comment){
                            if(err){
                                console.log(err);
                            } else{
                                blog.comments.push(comment);
                                blog.save();
                                console.log("Created a new comment");
                            }
                    });                    
                }
            });
        });
    });
}


module.exports = seedDB;
