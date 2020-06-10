const express = require("express");
const app = express();
const User = require("../../models/User.js");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/profile-pictures' });
const mongoose = require('mongoose');


app.post('/signup', upload.single("picture"),(req, res, next) => {
  const { username, email, password, city } = req.body;
  const profileImage = req.file.filename;

  if (!username || !email || !password || !city) {
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
      passwordHash: hashedPassword,
      profileImage
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


app.get("/signup", (req,res) => {
  if(req.query.error){
      res.render("users/signup", {error: true, message: req.query.error});
  } else {
      res.render("users/signup");
  }
});

module.exports = app;