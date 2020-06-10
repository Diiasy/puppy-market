const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");

app.get("/:id", (req, res)=>{
    let puppyId = req.params.id
    Puppy.findById(puppyId)
        // .populate("owner")
        .then((puppy)=>{
            res.render("puppies/detail", {puppy})
        })
    .catch((err)=> {
        console.log(err);
    })
})

module.exports = app;