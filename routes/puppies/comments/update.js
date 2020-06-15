const app = require("./create");
const Puppy = require("../../../models/Puppy");

app.patch("/puppies/:puppyId/comments/:commentsId", (req,res)=> {
    Puppy.findById(req.params.puppyId)
        .then((puppy)=> {
            let commentIndex = puppy.comments.findIndex((comment)=> comment.id === req.params.commentsId);
            puppy.comments[commentIndex].content = req.body.content;
            return puppy.save();
        })
        .then(()=> {
            res.end();
        })
        .catch(err=>{
            console.log(err);
        })
})

module.exports = app;