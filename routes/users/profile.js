const express = require("express");
const app = express();
const User = require("../../models/User.js");
const Puppy = require("../../models/Puppy.js");
const Review = require("../../models/Review.js");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/profile-pictures' });
const mongoose = require('mongoose');


app.get("/", (req, res) => {
  let userId = req.query.id;
  let isOwner = false;
  if (req.session.user._id === userId){
    isOwner = true;
  }
  User.findById(userId)
    .then((user) => {
      Puppy.find({owner: userId})
      .then((puppies) => {
        Review.find({reviewed: userId})
        .populate("reviewer")
        .populate("reviewed")
        .then((reviews)=> {
          res.render("users/profile", {user, puppies, isOwner, reviews});
        })
      })
    })
  .catch((err) => {
    console.log("Err",err);
  })
})

module.exports = app;

