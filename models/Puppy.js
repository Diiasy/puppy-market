const mongoose = require("mongoose");

const puppySchema = new mongoose.Schema ({
    name: { type: String },
    gender : { type: String, enum: ['Male', 'Female'] },
    breed: { type: [String] },
    birthDate: { type: Date },
    colors: { type: [String] },
    price: { type: String },
    mainPicture: { type: String },
    pictures: { type: [String] },
    description: { type: String },
    owner: { type: mongoose.Schema.ObjectId, ref:"User" }
})

const Puppy = mongoose.model("Puppy", puppySchema);

module.exports = Puppy;