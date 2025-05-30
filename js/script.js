// Manova mode light ho lasa dark na inversement

// Alainy lay élément manana id="mode__btn"
const modeToggler = document.getElementById("mode__btn");

// Alainy ny élément body
const body = document.querySelector("body");

/* 
 *** Mihaino izy hoe niova ve sa tsia ny valeur an'ilay input
     checkbox ici modeToggler, dia satria modeToggler de type
     checkbox dia jereny raha checked na tsia
 *** dia raha checked dia alany lay class dark amlay body
 *** sinon apetany
*/

modeToggler.addEventListener("change", () => {
  if (modeToggler.checked) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Pour le loader au début
  const main = document.querySelector(".main");
  const loader = document.querySelector(".loader");
  const header = document.querySelector("header");
  setTimeout(() => {
    if (main) main.classList.remove("hidden");
    if (loader) loader.classList.add("hidden");
    header.classList.remove("hidden");
  }, 3000);
});
