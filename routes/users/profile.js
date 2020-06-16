const express = require("express");
const app = express();
const User = require("../../models/User.js");
const Puppy = require("../../models/Puppy.js");
const Review = require("../../models/Review.js");


app.get("/", (req, res) => {
  let userId = req.query.id;
  let isOwner = false;
  if (req.session.user._id === userId){
    isOwner = true;
  }
  
  let visitor =  !isOwner;
  
  User.findById(userId)
    .then((user) => {
      Puppy.find({owner: userId})
      .then((puppies) => {
        let isSeller = false;
        if (puppies.length > 0){
            isSeller= true;
        }
        Review.find({reviewed: userId})
        .populate("reviewer")
        .populate("reviewed")
        .then((reviews)=> {
          res.render("users/profile", {user, puppies, isOwner, reviews, visitor, isSeller});
        });
      });
    })
  .catch((err) => {
    console.log("Err",err);
  });
});

module.exports = app;

