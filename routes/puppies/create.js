const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");
const uploadCloudPuppies = require('../../config/cloudinary.js');

app.get('/', (req, res)=>{
    res.render('puppies/create')
})

app.post('/', uploadCloudPuppies.array("pictures"), (req, res)=>{    
    const { name, gender, breed, birthDate, colors, price, description } = req.body;
    const owner = req.session.user._id;
    
    let mainPicture = "";
    let mainPicturePath = "";
    if (req.files){
        mainPicture = req.files[0].originalname;
        mainPicturePath = req.files[0].path;
    } else {
        res.render('puppies/create',  { errorMessage: 'You must upload a picture of your puppy.' });
        return;
    }
    
    let pictures = [];
    let picturesPath = [];
    let array = req.files.slice(1);
    if (array){
        array.forEach(el=>{
            pictures.push(el.originalname);
            picturesPath.push(el.path);
        });
    } 

    Puppy.create({
        name,
        mainPicture,
        mainPicturePath,
        gender,
        breed,
        birthDate,
        colors,
        price,
        description,
        owner,
        pictures,
        picturesPath
    })
    .then(puppy=>{
        res.redirect(`/puppies/detail/${puppy._id}`)
    })
    .catch((err)=> {
        console.log(err)
    })
})

module.exports = app;