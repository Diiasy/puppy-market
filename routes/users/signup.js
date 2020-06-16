const express = require("express");
const app = express();
const User = require("../../models/User.js");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const uploadCloudUsers = require('../../config/cloudinary.js');
const mongoose = require('mongoose');

app.post('/', uploadCloudUsers.single("picture"),(req, res, next) => {
  const { username, email, name, password, city } = req.body;
  const profileImage = req.file.originalname;
  const profileImagePath = req.file.path;

  if (!username || !email || !password || !city ||!name) {
    res.render('users/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
  res
    .status(500)
    .render('users/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
  return;
  }

  bcryptjs
  .genSalt(saltRounds)
  .then(salt => bcryptjs.hash(password, salt))
  .then(hashedPassword => {
    return User.create({
      username,
      email,
      city,
      name,
      passwordHash: hashedPassword,
      profileImage,
      profileImagePath
    });
  })
  .then(userFromDB => {
    console.log('Newly created user is: ', userFromDB);
    res.redirect('/');
  })
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render('users/signup', { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render('users/signup', {
        errorMessage: 'Username and email need to be unique. Either username or email is already used.'
      });
    } else {
      next(error);
    }
  }); 
});


app.get("/", (req,res) => {
  res.render("users/signup");
});

module.exports = app;