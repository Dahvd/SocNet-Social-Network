const post = require('../models/post');
const user = require('../models/user');

const passport = require('passport'),
User = require("../models/user"),
Post = require("../models/post"),


getUserParams = body => {
    return {
        firstName: body.firstNameTxt,
        lastName: body.lastNameTxt,
        username: body.usernameTxt,
        gender: body.ddGender,
        location: body.locationTxt,
        email: body.email, 
        password: body.password,
        securityQ: body.secQ,
        securityA: body.secQAnswer
    };
};

//get signup form
module.exports = {
    showSignUp: (req, res) => {
        res.render("users/signup", {formData: "temp", userFields: "temp", errorInfo: "temp", optional: "temp", sec: "temp"});
    },
    validate: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();

        req.check("email", "email is not valid!").notEmpty().isEmail();

        req.check("password", "Password can not be empty").notEmpty();

        req.getValidationResult().then((error) => {
            if(!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.locals.redirect = "/signup";
                next();
            }
            else next();
        });
    },
    create: (req, res, next) => {
        if(req.skip) return next();
        let userParams = getUserParams(req.body);

        let newUser = new User(userParams);
        console.log("before register", newUser);

        User.register(newUser, req.body.password, (error, user) => {
            console.log(user);
            if(user) {
                req.flash("success", `${user.fullName} has been successfully created`);
                res.locals.redirect = "/login";
                next();
            }
            else {
                req.flash("error", `Failed to create user: ${error.message}`);
                res.locals.redirect = "/signup";
                next();
            }
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        console.log("redirecting to: ", redirectPath);
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    getLogIn: (req, res) => {
        res.render("users/signin");
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
        successRedirect: "/home",
        successFlash: "Successfully logged in."
    }),
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out.");
        res.locals.redirect = "/";
        next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
        })
    },
    showView: (req, res) => {
        res.render("users/show");
    },
    showViewL: (req, res) => {
        res.render("users/showCurrentUser");
    },   

    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            res.render("users/edit");
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        })
    },
    update: (req, res, next) => {
        if(req.skip) return next();
        let userId = req.params.id,
        updatedUser = {
            firstName: req.body.firstNameTxt,
            lastName: req.body.lastNameTxt,
            gender: req.body.gender,
            location: req.body.locationTxt
        }
        User.findByIdAndUpdate(userId, updatedUser)
        .then(user => {
            res.locals.user = user;
            res.locals.redirect = `/users/${user._id}`;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
        .then(() => {
            res.locals.redirect = "/home";
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
    },
    showLPosts: (req, res, next) => {
        let temparr = [];
        Post.find().then(
            posts => {
                for(let i = 0; i < posts.length; i++) {
                    if (posts[i].poster == res.locals.currentUser.fullName){
                        temparr.push(posts[i])
                    }
                }
                res.locals.currentUserPosts = temparr;
                next();
            })
            .catch(error => {
                console.log(`Error fetching post data: ${error.message}`);
                next(error);
            })
    },
    showLPostsL: (req, res) => {
        res.render("users/currentUserPosts");
    },
    deletePost: (req, res, next) => {
        let postId = req.params.id;
        let index = res.locals.currentUser.posts.indexOf(postId);
        if (index > -1) {
            res.locals.currentUser.posts.splice(index, 1);
            res.locals.currentUser.save();
        }
        Post.findByIdAndRemove(postId)
        .then(() => {
            res.locals.redirect = "/home";
            next();
        })
        .catch(error => {
            console.log(`Error fetching post by ID: ${error.message}`);
            next(error);
        });
    },
    follow: (req, res, next) => {
        console.log("Follow");
        let userId = req.params.id;
        let cuser = res.locals.currentUser;
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            cuser.following.push(userId);
            cuser.save();
            res.locals.currentUser = cuser;
            res.locals.redirect = `/users/${userId}`;
            console.log("before next");
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
        })

    },
    unfollow: (req, res, next) => {
        console.log("UnFollow");
        let userId = req.params.id;
        let cuser = res.locals.currentUser;
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            let index = cuser.following.indexOf(userId);
            cuser.following.splice(index, 1);
            cuser.save();
            res.locals.currentUser = cuser;
            res.locals.redirect = `/users/${userId}`;
            console.log("before next");
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
        })

    },
    follow1: (req, res, next) => {
        console.log("Follow");
        let userId = req.params.id;
        let cuser = res.locals.currentUser;
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            cuser.following.push(userId);
            cuser.save();
            res.locals.currentUser = cuser;
            res.locals.redirect = `/home`;
            console.log("before next");
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
        })

    },
    unfollow1: (req, res, next) => {
        console.log("UnFollow");
        let userId = req.params.id;
        let cuser = res.locals.currentUser;
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            let index = cuser.following.indexOf(userId);
            cuser.following.splice(index, 1);
            cuser.save();
            res.locals.currentUser = cuser;
            res.locals.redirect = `/home`;
            console.log("before next");
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
        })

    },
    // followView:(req, res) => {
    //     User.findById(req.params.id)
    //     .then(user => {
    //         res.locals.user = user;
    //         next();
    //     })
    //     .catch(error => {
    //         console.log(`Error fetching user by ID: ${error.message}`);
    //     })
    //     console.log(res.locals);
    //     res.render("users/show");   
    //}


}
