const express = require("express"),
app = express(),
router = express.Router(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
usersController = require("./controllers/usersController"),
postsController = require("./controllers/postsController"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"),
passport = require("passport"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
expressValidator = require("express-validator"),
connectFlash = require("connect-flash"),
User = require("./models/user"),
Post = require("./models/post");

mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/soc_net", 
    {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);


app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

//middlewears
router.use(methodOverride("_method", {methods: ["POST", "GET"]}));
router.use(layouts);
router.use(express.static("public"));
router.use(expressValidator());

router.use(
    express.urlencoded({
        extended: false
    })
);

router.use(express.json());

//sesion and cookies
router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(connectFlash());

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})



//routes
router.get("/", homeController.getRoot);

router.get("/signup", usersController.showSignUp);
router.post("/signup", usersController.validate, usersController.create, usersController.redirectView);

router.get("/login", usersController.getLogIn);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/users/l/posts", usersController.showLPosts, usersController.showLPostsL);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/deletePost", usersController.deletePost, usersController.redirectView);
router.get("/users/:id/l", usersController.show, usersController.showViewL);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.post("/posts/create", postsController.create, postsController.redirectView);

router.get("/")

router.get("/home", homeController.home, homeController.home2, homeController.homeNext);


router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Sever is running on port: ${app.get("port")}`);
});