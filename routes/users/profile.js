const express = require("express");
const app = express();
const User = require("../../models/User.js");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/profile-pictures' });
const mongoose = require('mongoose');


app.get("/profile", (req, res) => {
    let objectId = req.query.id
    User.findById(objectId)
        .then((user) => {
            res.render("users/profile", {user});
        })
      .catch((err) => {
        console.log("Err",err)
      })
})

module.exports = app;
