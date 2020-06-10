const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");

app.get("/", (req,res)=> {
    Puppy.find({})
        .then((puppy)=> {
            res.render("puppies/list", {puppy});
        })
        .catch((err)=> {
            res.render("error", err);
        })
})

module.exports = app;