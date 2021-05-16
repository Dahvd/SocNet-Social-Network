const Post = require("../models/post");
const User = require("../models/user");


module.exports = {

    create: (req, res, next) => {
        let newPost = new Post({
            poster: res.locals.currentUser.fullName,
            description: req.body.description,
            user: res.locals.currentUser._id

        });
        Post.create(newPost)
        .then( post => {
            res.locals.post = post;
            res.locals.redirect = "/home";
            User.findOne(res.locals.currentUser._id).then(
                user => {
                    user.posts.push(post);
                    user.save();
                    res.locals.currentUser = user;
                }
            )

            next();
        })
        .catch(error => {
            console.log(`Error saving post: ${error.message}`);
            next(error);
        })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    }


}
