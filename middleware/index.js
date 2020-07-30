var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next){
                                    
                                if(req.isAuthenticated()){
                                    return next();
                                } else {
                                    req.flash("error", "You Need To Be Logged In First!");
                                    res.redirect("/login");
                                }
                            }
middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                req.flash("error", "Campground Not Found")
                res.redirect("back");
            } else {
                if(campground.author.id.equals(req.user.id)){
                    next();
                }
                else{
                    req.flash("error", "You Dont Have Permission To Do That");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You Need To Be Logged In");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //console.log(foundComment);
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You Dont Have Permission To Do That");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You Need To Be Logged In");
        res.redirect("back");
    }
}

module.exports = middlewareObj;