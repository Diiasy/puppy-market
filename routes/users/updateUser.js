const express = require("express");
const app = express();
const User = require("../../models/User.js");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/profile-pictures' });
const mongoose = require('mongoose');

app.get('/', (req, res) => {
  let userId = req.query.id;
  User.findById(userId)
  .then((user) => {
    res.render("users/updateUser", {user});
  })
  .catch((error) => {
    console.log(error);
  });
});

app.post('/', upload.single("picture"),(req, res, next) => {
    let userId = req.body._id;
    const {name, city } = req.body;
    let profileImage = req.body.profileImage;
    if (req.file){
      profileImage = req.file.filename;
    }
    if (!city || !name) {
      res.render('users/updateUser', { errorMessage: 'All fields are mandatory. Please provide your username, email, name, city and password.' });
      return;
    }
    User.findByIdAndUpdate(userId,{
      city,
      name,
      profileImage
    })
    .then(userFromDB => {
      console.log('Updated user is: ', userFromDB);
      res.redirect(`/users/profile?id=${userId}`);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('users/updateUser', { errorMessage: error.message });
      } else {
        next(error);
      }
    });
});
  


module.exports = app;

