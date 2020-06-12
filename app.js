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

// Routers
const indexRouter = require('./routes/index');
const signupRouter = require('./routes/users/signup');
const loginRouter = require('./routes/users/login');
const profileRouter = require('./routes/users/profile');
const updateUserRouter = require('./routes/users/updateUser');
const logoutRouter = require('./routes/users/logout');
const modeRouter = require('./routes/users/mode');

const puppiesRouter = require('./routes/puppies/list');
const puppiesCreateRouter = require('./routes/puppies/create');
const puppiesDetailRouter = require('./routes/puppies/detail');
const puppiesDeleteRouter = require('./routes/puppies/delete');
const puppiesUpdateRouter = require('./routes/puppies/update');

// Protect Middleware
function protectMiddleWare(req,res,next){
    console.log("Protect Middleware called");
    if(req.session.user){
        next();
    } else {
        res.redirect("/users/login");
    }
}

function mapToNav(req,res,next){
    console.log("Middleware for nav called");
    if(req.session.user){
        res.locals.loggedIn = true;
        res.locals.user = req.session.user;
    }
    next();
}

function mapModeToNav(req,res,next){

    if(req.session.buyer) {
        res.locals.buyer = true;
        res.locals.seller = false;
    } else {
        res.locals.buyer = false;
        res.locals.seller = true;
    }
    console.log(`Middleware mode called, session buyer is ${req.session.buyer}`);
    next();
}

function isSeller(req, res, next){
    if(res.locals.seller){
        next();
    } else {
        res.redirect("/");
    }
}

app.use(mapToNav);
app.use(mapModeToNav);


// Routes Middleware
app.use('/', indexRouter);
app.use('/users/signup', signupRouter);
app.use('/users/login', loginRouter);
app.use('/users/profile',protectMiddleWare, profileRouter);
app.use('/users/logout', protectMiddleWare, logoutRouter);
app.use('/users/mode', protectMiddleWare, modeRouter);

app.use('/users/updateUser', updateUserRouter);
app.use('/puppies', puppiesRouter);
app.use('/puppies/create',protectMiddleWare, isSeller, puppiesCreateRouter);
app.use('/puppies/detail',protectMiddleWare, puppiesDetailRouter);
app.use('/puppies/delete', puppiesDeleteRouter);
app.use('/puppies/update', puppiesUpdateRouter);

app.listen(process.env.port, ()=> {
    console.log("Webserver is listening", process.env.port);
});