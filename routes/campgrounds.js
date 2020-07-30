var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");
router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campground){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("campgrounds/campgrounds", {campgrounds : campground});
        }
    });
});

router.post("/campgrounds",middleware.isLoggedIn,function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var location = req.body.location;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name : name, price : price, location : location, image : image, description : desc, author: author};
    Campground.create(newCampground, function(err, campground){
        if(err)
        {
            console.log(err);
        }
        else
        {  
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new",middleware.isLoggedIn,function(req, res){
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req, res){
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            
            res.render("campgrounds/show", {campground : foundCampground});
        }
    });
});

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
    
        Campground.findById(req.params.id, function(err, campground){
            
            res.render("campgrounds/edit", {campground: campground});
        });
});

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){ 
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds");
    });
});
module.exports = router;