const express = require("express");
const app = express();

app.get("/seller", (req,res)=> {
    req.session.buyer = false;
    req.session.seller = true;
    res.redirect("/");
});

app.get("/buyer", (req,res)=> {
    req.session.buyer = true;
    req.session.seller = false;
    res.redirect("/");
});



module.exports = app;