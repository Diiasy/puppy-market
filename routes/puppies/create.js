const express = require("express");
const app = express();
const Puppy = require("../../models/Puppy");
const User = require("../../models/User");
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/puppies/' });

app.get('/', (req, res)=>{
    // User.find()
    // .then((owner)=>{
    //     res.render('puppies/create', {owner});
    // })
    res.render('puppies/create')
})

app.post('/', upload.single("picture"), (req, res)=>{
    const { name, breed, birthDate, colors, price, description } = req.body;
    // const owner = req.session.currentUser._id;

    let picture = "";
    if (req.file){
        picture = req.file.filename;
    } else {
        res.render('puppies/create',  { errorMessage: 'You must upload a picture of your puppy.' });
        return;
    }

    Puppy.create({
        name,
        breed,
        birthDate,
        colors,
        price,
        description,
        // owner,
        picture
    })
    .then(puppy=>{
        res.redirect(`/puppies/detail/${puppy._id}`)
    })
    .catch((err)=> {
        console.log(err)
    })
})

module.exports = app;