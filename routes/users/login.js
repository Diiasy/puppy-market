const express = require("express");
const app = express();
const User = require("../../models/User.js");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/profile-pictures' });
const mongoose = require('mongoose');


app.get('/', (req, res) => res.render('users/login'));

app.post('/', (req, res, next) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.render('users/login', {
        errorMessage: 'Please enter both, email and password to login.'
        });
        return;
    }

    User.findOne({ email })
        .then(user => {
        if (!user) {
            res.render('users/login', { errorMessage: 'Email is not registered. Try with other email.' });
            return;
        } else if (bcryptjs.compareSync(password, user.passwordHash)) {
            req.session.user = user;
            req.session.buyer = true;
            req.session.seller = false;
            res.redirect('/');
        } else {
            res.render('users/login', { errorMessage: 'Incorrect password.' });
        }
        })
        .catch(error => next(error));
});

module.exports = app;