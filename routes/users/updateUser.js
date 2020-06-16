const express = require("express");
const app = express();
const User = require("../../models/User.js");
const uploadCloudUsers = require('../../config/cloudinary.js');
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

app.post('/', uploadCloudUsers.single("picture"),(req, res, next) => {
    let userId = req.body._id;
    const {name, city } = req.body;
    let profileImage = req.body.profileImage;
    let profileImagePath = req.body.profileImagePath;
    if (req.file){
        profileImage = req.file.originalname;
        profileImagePath = req.file.path;

    }
    if (!city || !name) {
      res.render('users/updateUser', { errorMessage: 'All fields are mandatory. Please provide your username, email, name, city and password.' });
      return;
    }
    User.findByIdAndUpdate(userId,{
        city,
        name,
        profileImage,
        profileImagePath
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

