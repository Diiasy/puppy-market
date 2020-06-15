const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");

app.get("/:id", (req, res)=>{
    let puppyId = req.params.id
    Puppy.findById(puppyId)
        .populate("owner")
        .populate("comments.author")
        .then(puppy=>{
            let userId = req.session.user._id;
            let morePictures = false;
            if (puppy.pictures.length > 0){
                morePictures = true;
            }
            Puppy.find({owner: userId})
                .then(puppyOwner=>{
                    let isOwner = false;
                    puppyOwner.forEach(el=>{
                        if (el.id === puppyId){
                            isOwner = true;
                        }
                    })
                    res.render("puppies/detail", {puppy, isOwner, morePictures});
                })
            
        })
        .catch((err)=> {
            console.log(err);
        })
})

module.exports = app;