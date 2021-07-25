var express  =require("express");
var router   =express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");



//  =========================
//       COMENTS ROUTES
//  =========================

router.get("/campgrounds/:id/comments/new", isLoggedIn,(req,res)=>{
    //find campground ny id
    Campground.findById(req.params.id, (err,campground)=>{
      if(err){
          console.log(err);
      } else{

            res.render("comments/new", {campground : campground}); 
      }
    });

});
 
router.post("/campgrounds/:id/comments", isLoggedIn, (req,res)=>{
// lookup campground using id

 
Campground.findById(req.params.id, (err,campground)=>{
    if(err){
        console.log(err);
    } else{
            //create new comment
            Comment.create(req.body.comment, (errr,comment)=>{
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else
                { 
                    // add username and id to connect
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment!");
                    res.redirect('/campgrounds/' + campground._id)
                }
            })
            //connect new comment to campground
            //redirect show page
            
    }
})

});

//comment edit route
router.get("/campgrounds/:id/comments/:comment_id/edit", checkCommentOwnership, function(req,res){
      Comment.findById(req.params.comment_id, function(err,foundComment){
          if(err){
              res.redirect("back");
          }else
          {
             res.render("comments/edit",{campground_id: req.params.id, comment:foundComment});
          }
      });
      
});

//comment update route

router.put("/campgrounds/:id/comments/:comment_id", checkCommentOwnership, function(req,res){
       Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
               if(err){
                   res.redirect("back");
               }else{
                   res.redirect("/campgrounds/"+ req.params.id);
               }
       });
});

//comment destroy route

router.delete("/campgrounds/:id/comments/:comment_id", checkCommentOwnership,function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
          
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});


function isLoggedIn(req,res,next){
       if(req.isAuthenticated()){
             return next();
       }
       res.redirect("/login");
};

function checkCommentOwnership(req, res, next){
     if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id, function(err,foundComment){
           if(err){
               res.redirect("back");
           }else
           {
               if(foundComment.author.id.equals(req.user._id)){
                     next();
               } else{
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("back");
               }
              
           }
          });
    }else
    {
        req.flash("error", "You need to be loggedin to do that!");
      res.redirect("back");
    }
}

module.exports =router;