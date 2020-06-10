require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');

const hbs = require('hbs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true
}));

const mongoose = require('mongoose');

mongoose
    .connect(process.env.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.log(err);
    });


// ROUTERS
const indexRouter = require('./routes/index');
const signupRouter = require('./routes/users/signup');

// Routes middleware





app.use('/', indexRouter);
app.use('/users', signupRouter);




app.use("/puppies/create", require("./routes/puppies/create"));

app.listen(process.env.port, ()=> {
    console.log("Webserver is listening", process.env.port);
});