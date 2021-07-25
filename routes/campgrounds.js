var express  =require("express");
var router   =express.Router();
var Campground= require("../models/campground");




//SHOW ALL CAMPGROUNDS
router.get("/campgrounds",(req,res)=>{
//get all campground from db
Campground.find({}, function(err,allCampgrounds){
   if(err){
       console.log(err);
   } else {
       res.render("campgrounds/index", {campgrounds : allCampgrounds, currentUser: req.user});
   }
});

});



router.post("/campgrounds", isLoggedIn, (req,res)=>{
//get data from form and add to compounds array
//redirect back to campgrounds page

var name=req.body.name;
var image=req.body.image;
var dec=req.body.description;
var author ={
    id: req.user._id,
    username: req.user.username
}
var newCampground={name:name, image:image, description:dec, author:author};
/* campgrounds.push(newcampground); */
// create a new campground and save it to DB
Campground.create(newCampground, function(err,newlyCreated){
  if(err){
      console.log(err);
  } else {
      res.redirect("/campgrounds");
  }
});



});

router.get("/campgrounds/new", isLoggedIn, (req,res)=>{
res.render("campgrounds/new");
});

//show more info about campground

router.get("/campgrounds/:id", function(req,res){
    //find the campground with provided id
    //render show templete
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    
        if(err){
            console.log(err);
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }

    });
    
  
});



// EDIT CAMPGROUND ROUTE

router.get("/campgrounds/:id/edit", checkCampgroundOwnership, function(req,res){
  
          Campground.findById(req.params.id, function(err,foundCampground){
                res.render("campgrounds/edit", {campground: foundCampground});
          });
});

  // find and update correct campground
router.put("/campgrounds/:id", checkCampgroundOwnership, function(req,res){
 
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err, updatedCmpground){
          if(err){
              res.redirect("/campgrounds");
          } else
          {
               res.redirect("/campgrounds/"+ req.params.id);
          }
   });
});


//DESTROY CAMPGROUND ROUTES

router.delete("/campgrounds/:id", checkCampgroundOwnership,function(req,res){
      Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else
        {
            res.redirect("/campgrounds");
        }
      });
});


function isLoggedIn(req,res,next){
       if(req.isAuthenticated()){
             return next();
       }
       req.flash("error","Please Login First!");
       res.redirect("/login");
};


function checkCampgroundOwnership(req, res, next){
     if(req.isAuthenticated()){
          Campground.findById(req.params.id, function(err,foundCampground){
           if(err){
               req.flash("error", "Campground not found");
               res.redirect("back");
           }else
           {
               if(foundCampground.author.id.equals(req.user._id)){
                     next();
               } else{
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("back");
               }
              
           }
          });
    }else
    {
        req.flash("error","You need to be logged in to do that!");
      res.redirect("back");
    }
}


module.exports =router;