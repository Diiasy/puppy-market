let puppyId = document.querySelector(".puppy-id").value;
let $comments = document.querySelectorAll(".update-comments");
let $updateBtn = document.querySelectorAll(".update-comments-btn");

for(let i =0; i< $comments.length; i++){
    $comments[i].addEventListener("submit", (event)=> {
        event.preventDefault();
        let $updateContentInput = event.currentTarget.querySelector(".update-comments-content");
        let newContent = { content:$updateContentInput.value };
        let commentId = event.currentTarget.querySelector(".comments-id").value;
        let url = `/puppies/${puppyId}/comments/${commentId}`
        axios.patch(url, newContent)
            .then(response=>{
                console.log(response);
                let $commentContent = event.target.closest(".update-comments").querySelector(".comments-content");
                $commentContent.innerHTML = newContent.content;
                event.target.style.display = "none";
            })
            .catch(err=>{
                console.log(err);
            })
    })
}


// for(let i =0; i< $comments.length; i++){
//     $comments[i].addEventListener("submit", (event)=> {
//         $updateBtn[i].addEventListener("click", e=>{
//             event.preventDefault();
//             let $comments = event.currentTarget.querySelector(".comments");
//             let $updateForm = event.currentTarget.querySelector(".update-comments-form");
//             let commentId = event.currentTarget.querySelector(".comments-id").value;
//             let url = `/puppies/${puppyId}/comments/${commentId}`
//             axios.get(url)
//                 .then(response=>{
//                     console.log(response);
//                     $comments.style.display = "none";
//                     $updateForm.style.display = "block";
    
//                 })
//                 .catch(err=>{
//                     console.log(err);
//                 })
//         })
        
//     })
// }