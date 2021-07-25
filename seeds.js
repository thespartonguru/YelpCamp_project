var mongoose      =require("mongoose");
var Campground    =require("./models/campground");
var Comment       =require("./models/comment");
var data=[
    {
        name:"cnkdsj",
        image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        description:"Camping is an outdoor activity involving overnight stays away from home with or without a shelter, such as a tent or a recreational vehicle. Typically participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. The night (or more) spent outdoors distinguishes camping from day-tripping, picnicking, and other similarly short-term recreational activities"
    },
    {
        name:"cnkdsj",
        image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        description:"Camping is an outdoor activity involving overnight stays away from home with or without a shelter, such as a tent or a recreational vehicle. Typically participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. The night (or more) spent outdoors distinguishes camping from day-tripping, picnicking, and other similarly short-term recreational activities"
    },
    {
        name:"cnkdsj",
        image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        description:"Camping is an outdoor activity involving overnight stays away from home with or without a shelter, such as a tent or a recreational vehicle. Typically participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. The night (or more) spent outdoors distinguishes camping from day-tripping, picnicking, and other similarly short-term recreational activities"
    }
]

/*function seedDB(){
    // delete all campgrounds
Campground.deleteMany({}, (err)=>{
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds");
    //add few campgrounds
     data.forEach(function(seed){
         Campground.create(seed, (err,campground)=>{
             if(err) {console.log(err)}
             else{
                 console.log("added");
                 // create comment
                 Comment.create(
                   {
                       text:"this place is",
                       author:"gms"
                   },(err,comment)=>{
                    if(err){
                        console.log(err);
                    } else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created new campgroun");
                    }

                   });
             }
         });
     });
});



}; */



//module.exports=seedDB;
 