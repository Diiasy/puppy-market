const express = require("express");
const app = express();
const User = require("../../models/User.js");
const Puppy = require("../../models/Puppy.js");
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
      Puppy.find({owner: user._id})
      .then((puppies) => {
        res.render("users/profile", {user, puppies, isOwner});
      })
    })
  .catch((err) => {
    console.log("Err",err);
  })
})

module.exports = app;

