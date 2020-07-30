var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name : "Clouds Rest",
        image : "https://i.imgur.com/nXjDbCMg.jpg",
        description : "blah Blah Blah"
    },
    {
        name : "Clouds Rest",
        image : "https://i.imgur.com/nXjDbCMg.jpg",
        description : "blah Blah Blah"
    },
    {
        name : "Clouds Rest",
        image : "https://i.imgur.com/nXjDbCMg.jpg",
        description : "blah Blah Blah"
    }
];

function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
   
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        Comment.create({
                            text : "This place is great but i wish, we had internet",
                            author : "Bishop"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                            }
                        });
                    }
                });
            });
        }
    });
};

module.exports = seedDB;