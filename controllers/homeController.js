//call back functions for different routes
const User = require("../models/user"),
Post = require("../models/post");

module.exports = {
    getRoot: (req, res) => {
        res.render("users/signin", {errorMsg: false, emailData: false});
    },
    home: (req, res, next) => {
        User.find()
        .then(users => {
            res.locals.users = users;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user data: ${error.message}`);
            next(error);
        })
    },
    home2: (req, res, next) => {
        Post.find()
        .then(posts => {
            res.locals.posts = posts;
            next();
        })
        .catch(error => {
            console.log(`Error fetching post data: ${error.message}`);
            next(error);
        })
    },
    homeNext: (req, res) => {
        res.render("home")
    }
    

}