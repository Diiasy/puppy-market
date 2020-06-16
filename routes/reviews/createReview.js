const express = require('express');
const app = express();
const User = require("../../models/User");
const Review = require("../../models/Review");

app.post('/', (req, res) => {
    const reviewer = req.session.user._id;
    const review = req.body.review;
    const score = req.body.score;
    const reviewed = req.query.profile_id;
    Review.create({
        reviewer,
        review,
        score,
        reviewed
    })
    .then(newReview => {
        res.redirect(`/users/profile?id=${reviewed}`);
    })
    .catch((error) => {
      console.log(error);
    });
});


module.exports = app;

