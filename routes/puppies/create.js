const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");
const User = require("../../models/User");
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/puppies/' });

app.get('/', (req, res)=>{
    res.render('puppies/create')
})

app.post('/', upload.array("pictures"), (req, res)=>{    

    const { name, gender, breed, birthDate, colors, price, description } = req.body;
    const owner = req.session.user._id;

    let mainPicture = "";
    if (req.files){
        mainPicture = req.files[0].filename;
    } else {
        res.render('puppies/create',  { errorMessage: 'You must upload a picture of your puppy.' });
        return;
    }
    
    let pictures = [];
    let array = req.files.slice(1);
    if (array){
        array.forEach(el=>{pictures.push(el.filename)});
    } 

    Puppy.create({
        name,
        mainPicture,
        gender,
        breed,
        birthDate,
        colors,
        price,
        description,
        owner,
        pictures
    })
    .then(puppy=>{
        res.redirect(`/puppies/detail/${puppy._id}`)
    })
    .catch((err)=> {
        console.log(err)
    })
})

module.exports = app;