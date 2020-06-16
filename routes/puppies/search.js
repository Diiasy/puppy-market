const express = require('express');
const app = express();
const Puppy = require("../../models/Puppy");

app.get('/', (req, res) => {
    let searchTerm = String(req.query.search);
    Puppy.find(
        { $text: { $search: searchTerm } }
    )
    .then(puppy => {
        res.render("puppies/list", {puppy});
    })
    .catch((err) => {
        console.log("Err",err);
    });
});

module.exports = app;
