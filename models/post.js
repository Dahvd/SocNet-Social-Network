const mongoose = require("mongoose"),
{ Schema } = require("mongoose");
const postSchema = new Schema({
    poster: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: "User" }
 },
 {timestamp: true}
);

module.exports = mongoose.model("Post", postSchema);