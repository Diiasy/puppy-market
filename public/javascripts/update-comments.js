let puppyId = document.querySelector(".puppy-id").value;
let $comments = document.querySelectorAll(".update-comments");

for(let i =0; i< $comments.length; i++){
    $comments[i].addEventListener("submit", (event)=> {
        event.preventDefault();
        let $updateContentInput = event.currentTarget.querySelector(".update-comments-content");
        let newContent = { content:$updateContentInput.value };
        let commentId = event.currentTarget.querySelector(".comments-id").value;
        let url = `/puppies/${puppyId}/comments/${commentId}`
        axios.patch(url, newContent)
            .then(response=>{
                let $commentContent = event.target.closest(".update-comments").querySelector(".comments-content");
                $commentContent.innerHTML = newContent.content;
                let $updatedComment = event.target.closest(".update-comments").querySelector(".comments");
                $updatedComment.style.display = "block";
                event.target.style.display = "none";
            })
            .catch(err=>{
                console.log(err);
            })
    })
}

let $updateBtns = document.querySelectorAll(".update-comments-btn");
for(let i =0; i< $updateBtns.length; i++){
    $updateBtns[i].addEventListener("click", (e)=> {
        e.preventDefault();
        let $updateComments = e.currentTarget.closest(".update-comments");
        let $comments =  $updateComments.querySelector(".comments");
        let $updateForm =  $updateComments.querySelector(".update-comments-form");
        $updateForm.style.display = "block";
        $comments.style.display = "none";
    })
}   
