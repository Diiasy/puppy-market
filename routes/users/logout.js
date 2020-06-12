const express = require("express");
const app = express();
const User = require("../../models/User.js");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/profile-pictures' });
const mongoose = require('mongoose');


app.get('/', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
  

module.exports = app;