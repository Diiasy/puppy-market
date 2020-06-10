const mongoose = require("mongoose");

const puppySchema = new mongoose.Schema ({
    name: { type: String, required: true },
    breed: { type: [String] },
    birthDate: { type: Date },
    colors: { type: [String] },
    price: { type: String },
    picture: { type: String, required: true },
    description: { type: String },
    // owner: { type: mongoose.Schema.ObjectId, ref:"User" }
})

const Puppy = mongoose.model("Puppy", puppySchema);

module.exports = Puppy;