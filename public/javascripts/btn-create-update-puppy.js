let $addBreedBtn = document.querySelector("#add-breed-btn");
let $breedInput = document.querySelector(".breed-div"); 
$addBreedBtn.addEventListener("click", e => {
    e.preventDefault();
    let $newBreed = document.createElement("input");
    $newBreed.setAttribute("type", "text");
    $newBreed.setAttribute("class", "breed");
    $newBreed.setAttribute("placeholder", "Breed");
    $newBreed.setAttribute("name", "breed");
    $breedInput.insertBefore($newBreed, $addBreedBtn);
})
let $deleteBreedBtn = document.querySelector("#delete-breed-btn");
$deleteBreedBtn.addEventListener("click", e => {
    e.preventDefault();
    let $breed = $breedInput.querySelectorAll(".breed");
    let $breedToRemove = $breed[$breed.length-1];
    $breedInput.removeChild($breedToRemove);
})

let $addColorBtn = document.querySelector("#add-color-btn");
let $colorInput = document.querySelector(".color-div"); 
$addColorBtn.addEventListener("click", e => {
    e.preventDefault();
    let $newColor = document.createElement("input");
    $newColor.setAttribute("type", "text");
    $newColor.setAttribute("class", "color");
    $newColor.setAttribute("placeholder", "Color");
    $newColor.setAttribute("name", "colors");
    $colorInput.insertBefore($newColor, $addColorBtn);
})
let $deleteColorBtn = document.querySelector("#delete-color-btn");
$deleteColorBtn.addEventListener("click", e => {
    e.preventDefault();
    let $color = $colorInput.querySelectorAll(".color");
    let $colorToRemove = $color[$color.length-1];
    $colorInput.removeChild($colorToRemove);
})


let $addPictureBtn = document.querySelector("#add-picture-btn");
let $pictureInput = document.querySelector(".pictures-div");
$addPictureBtn.addEventListener("click", e =>{
    e.preventDefault();
    let $newPicture = document.createElement("input");
    $newPicture.setAttribute("type", "file");
    $newPicture.setAttribute("class", "pictures");
    $newPicture.setAttribute("name", "pictures");
    $pictureInput.insertBefore($newPicture, $addPictureBtn);
})
let $deletePictureBtn = document.querySelector("#delete-picture-btn");
$deletePictureBtn.addEventListener("click", e => {
    e.preventDefault();
    let $picture = document.querySelectorAll(".pictures");
    let $pictureToRemove = $picture[$picture.length-1];
    $pictureInput.removeChild($pictureToRemove);
})
