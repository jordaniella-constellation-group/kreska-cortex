/*
 *** Maka an'ilay infos ao amin'ny utils/members.json mba amzay ovainy dynamiquement
 *** lay page web en fonction anzay membre en cours
 */
let currentIndex = 1;
let carouselUser = [
  "images/aina/avatar.png",
  "images/ismael/avatar.png",
  "images/toky/avatar.png",
  "images/sahaza/avatar.png",
];
// Alaina daholo zay element ilaina ao amlay html antsika
const firstName = document.querySelector(".first-name");
const lastName = document.querySelector(".last-name");
const matricule = document.querySelector(".matricule");
const speciality = document.querySelector(".speciality");
const facebook = document.querySelector(".member__facebook");
const phone = document.querySelector(".member__phone");
const citation = document.querySelector(".citation");
const technos = document.querySelector(".technos ul");
const image = document.querySelector(".image");
const carousel = document.querySelector(".carousel");

// Ito zao fonction 1 miréarranger an'ilay carousel ao am html
function reorderCarousel(array, targetIndex) {
  if (targetIndex === 1) return array;
  const copy = [...array];
  const [moved] = copy.splice(targetIndex, 1);
  copy.splice(1, 0, moved);
  return copy;
}
// version modifiée de createCarousel pour accepter un dataset
function createCarousel(dataFromOutside = null) {
  carousel.innerHTML = "";

  const dataPromise = dataFromOutside
    ? Promise.resolve(dataFromOutside) // utiliser les données passées
    : fetch("../utils/members.json").then((res) => res.json()); // sinon fetch

  dataPromise
    .then((data) => {
      data.forEach((item, idx) => {
        const div = document.createElement("div");
        div.classList.add("img__container");
        if (idx === 1) div.classList.add("active");

        const img = document.createElement("img");
        img.id = item.id;
        img.src = `../${item.image}`;
        img.alt = `member Cortex Team ${idx}`;

        div.appendChild(img);

        div.addEventListener("click", (e) => {
          const clickedIndex = data.findIndex((d) => d.id === item.id);
          const reordered = reorderCarousel(data, clickedIndex);
          createCarousel(reordered); // relancer avec nouvelles données
          changeUser(e.target.id);
        });

        carousel.appendChild(div);
      });
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du JSON :", error)
    );
}

// Appel initial
createCarousel();

const changeUser = (index) => {
  // Otranzao no atao hoe manao requête
  fetch("../utils/members.json")
    .then((response) => response.json())
    .then((data) => {
      currentMember = data.filter((item) => item.id == index)[0];
      firstName.innerHTML = currentMember.nom;
      lastName.innerHTML = currentMember.prenom;
      matricule.innerHTML = currentMember.matricule;
      speciality.innerHTML = currentMember.speciality;
      facebook.innerHTML = currentMember.facebook;
      phone.innerHTML = currentMember.phone;
      citation.innerHTML = currentMember.citation;
      image.innerHTML = "";
      const img = document.createElement("img");
      img.src = `../${currentMember.image}`;
      img.alt = `${currentMember.nom} ${currentMember.prenom}`;
      image.appendChild(img);
      technos.innerHTML = "";
      currentMember.technos.map((item) => {
        const li = document.createElement("li");
        li.innerHTML = item;
        technos.appendChild(li);
      });
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du JSON :", error)
    );
};

const main = () => {
  changeUser(currentIndex);
  createCarousel();
};

// Antsoina ilay programme principale
main();
