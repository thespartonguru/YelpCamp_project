var express       =require("express"),
    app           =express(),
    bodyparser    =require("body-parser"),
    mongoose      =require("mongoose"),
    Campground    =require("./models/campground"),
    Comment       =require("./models/comment"),
    seedDB        =require("./seeds"),
    methodOverride=require("method-override"),
    passport      =require("passport"),
    LocalStrategy =require("passport-local"),
    User          =require("./models/user"),
    flash         =require("connect-flash")

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")




//seedDB(); 
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

mongoose.set('useFindAndModify', false);
// PASSPORT CONFIGURATION
app.use(require("express-session")({
       secret: "hi there how are you!!",
       resave:  false,
       saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen("3000", ()=>{
console.log("Server has started!");
});