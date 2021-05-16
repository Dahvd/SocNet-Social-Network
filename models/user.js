const passporrtLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    { Schema } = require("mongoose");

var userSchema = new Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        location: String,
        email: {
            type: String,
            required: true
        }, 
        password: {
            type: String,
            required: true
        },
        securityQ: {
            type: String,
            required: true
        },
        securityA: {
            type: String,
            required: true
        },
        posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
    },

    {
        timestamps:true
    }
);

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});
userSchema.virtual("numPosts").get(function () {
    return `${this.posts.length}`;
});

userSchema.plugin(passporrtLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);