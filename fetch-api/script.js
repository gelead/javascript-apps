const cat_result = document.getElementById("cat_result");
const dog_result = document.getElementById("dog_result");
const cat_btn = document.getElementById("cat_btn");
const dog_btn = document.getElementById("dog_btn");

cat_btn.addEventListener("click", getRandCat)
dog_btn.addEventListener("click", getRandDog);

function getRandDog() {
  fetch("https://random.dog/woof.json")
    .then((res) => res.json())
    .then((data) => {
      dog_result.innerHTML = `<img src="${data.url}"/>`;
    });
}

function getRandCat() {
  fetch("https://randomfox.ca/floof/")
    .then((res) => res.json())
    .then((data) => {
      cat_result.innerHTML = `<img src="${data.image}"/>`;
    });
}
