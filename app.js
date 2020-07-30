var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var Campground = require("./models/campground");
var app = express();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Comment = require("./models/comment");
var User = require("./models/user");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine", "ejs");
mongoose.set('useFindAndModify', false);
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
    secret : "This is A very Big Secret", 
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(3000);