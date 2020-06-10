const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");
const User = require("../../models/User");

app.get("/puppies/create", (req, res)=>{
    // User.find()
    // .then((owner)=>{
    //     res.render("puppies/create", {owner});
    // })
    res.render("puppies/create")
})

app.post("/puppies/create", (req, res)=>{
    let newPuppy = req.body;
    
    Puppy.create(newPuppy)
    .then((puppy)=>{
        res.redirect(`/puppies/detail/${puppy._id}`)
    })
    .catch((err)=> {
        console.log(err)
    })
})

module.exports = app;