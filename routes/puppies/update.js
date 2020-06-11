const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");
const User = require("../../models/User");
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/puppies/' });

app.get("/:id", (req, res) =>{
    User.find()
    .then((owner)=>{
        let puppyId = req.params.id;
        Puppy.findById(puppyId)
        .then((puppy)=>{
            switch(puppy.gender){
                case 'Male':
                    puppy.male = true;
                    break;
                case 'Female':
                    puppy.female = true;
                    break;
                default:
                    break; 
            }
            res.render("puppies/update", {puppy, owner})
        })
    })
    .catch((err)=> {
        console.log(err);
    })
})

app.post("/", upload.array("pictures"), (req, res)=>{
    let puppyId = req.body.id;

    let mainPicture = req.body.mainPicture;
    if (req.files[0]){
        mainPicture = req.files[0].filename;
    }

    Puppy.findByIdAndUpdate(puppyId, {
        name: req.body.name,
        mainPicture,
        gender: req.body.gender,
        breed: req.body.breed,
        birthDate: req.body.birthDate,
        colors: req.body.colors,
        price: req.body.price
        // pictures: req.body.pictures
    })
    .then((puppy)=>{
        res.redirect(`/puppies/detail/${puppyId}`)
    })
    .catch((err)=> {
        console.log(err);
    })
})

module.exports = app;