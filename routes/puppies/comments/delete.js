const express = require('express');
const app = express();
const Puppy = require("../../../models/Puppy");


app.get("/puppies/:puppyId/comments/delete/:commentId", (req, res) => {
    let commentId = req.params.commentId;
    let puppyId = req.params.puppyId;
    Puppy.findByIdAndUpdate(
        puppyId, 
        { $pull: { comments:  {_id: commentId} } }
    )
    .then((puppy) => {
        res.redirect(`/puppies/detail/${puppyId}`)
    })
    .catch((err) => {
    console.log("Err",err)
    })
})

module.exports = app;