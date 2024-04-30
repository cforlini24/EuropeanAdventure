const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Lineup = new Schema({
    map: String,
    ct : Boolean,
    posImage64: String,
    aimImage64: String,
    desc: String,
    type: String,
    title: String
})

module.exports = model("lineup", Lineup);