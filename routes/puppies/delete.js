const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");

app.get("/:id", (req, res)=>{
    let puppyId = req.params.id;
    Puppy.findByIdAndDelete(puppyId)
    .then(()=> {
        res.redirect("/puppies");
    })
    .catch((err)=> {
        console.log(err);
    })
})

module.exports = app;