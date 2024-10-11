const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const Post = new Schema({
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: false
    },
    photos: [String],
    date: String
})

module.exports = model("posts", Post);