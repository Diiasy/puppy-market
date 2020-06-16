const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");

app.get("/:id", (req, res)=>{
    let puppyId = req.params.id
    Puppy.findById(puppyId)
    .populate("owner")
    .populate("comments.author")
    .then(puppy=>{
        let morePictures = false;
        if (puppy.pictures.length > 0){
            morePictures = true;
        }

        let userId = req.session.user._id;
        let isOwner = false;
        if (puppy.owner.id === userId){
            isOwner = true;
        }
        
        let comments = puppy.comments.map(comment=>{
            return({
                id: comment.id,
                author: comment.author,
                content: comment.content,
                isAuthor: comment.author.id === userId
            })
        })

        res.render("puppies/detail", {puppy, isOwner, comments, morePictures});
    })
    .catch((err)=> {
        console.log(err);
    })
})

module.exports = app;