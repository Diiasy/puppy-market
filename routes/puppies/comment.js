const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");
const User = require("../../models/User");

app.post('/',(req, res) => {
    const puppyId = req.body.id;
    const author = req.session.user._id;
    const content = req.body.content;
    
    Puppy.findByIdAndUpdate(puppyId,{ $push: {comments: {author, content}}})

    .then(puppy => {
      res.redirect(`/puppies/detail/${puppyId}`);
    })
    .catch((err) => {
      console.log("Err",err);
    })
  });

module.exports = app;