////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Vérifie si l'utilisateur est connecté ou non et ajuste la page comme tel
if (window.sessionStorage.getItem('token')) {
    const headBar = document.getElementById('loggedBand');
    headBar.style.display = 'flex';

    const logout = document.getElementById('navOn');
    const login = document.getElementById('navOff');
    login.style.display = 'none';
    logout.style.display = 'block';

    const editBtn = document.getElementById('loggedEdit');
    editBtn.style.display = 'block';
}

// Efface le token afin de se déconnecter du compte actuel
document.getElementById('navOn').onclick = function() {
    if (window.sessionStorage.getItem('token')) {
        window.sessionStorage.removeItem('token')
    };
    location.reload()
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Projets dynamiques générés sur la page index.html depuis le backend

// Récupère les travaux depuis l'API et les traduits en JSON
const getWorks = await fetch("http://localhost:5678/api/works");
const works = await getWorks.json();

function genererProjects(projects) {
    for (let i = 0; i < projects.length; i++) {
        // Index du projet actuel à chaque boucle
        const project = projects[i];
        // Séléctionne la classe "gallery" dans le HTML
        const gallery = document.querySelector(".gallery");
        // Crée la box parent de la vignette
        const figureElement = document.createElement("figure");

        // Crée la box image de la vignette
        const imgElement = document.createElement("img");
        imgElement.src = project.imageUrl;
        // Crée la box titre de la vignette
        const textElement = document.createElement("figcaption");
        textElement.innerHTML = project.title;

        // Associe la box parent à la classe gallery en tant qu'enfant
        gallery.appendChild(figureElement);
        // Associe l'image et le titre de la vignette à leur box parent
        figureElement.appendChild(imgElement);
        figureElement.appendChild(textElement)
    };
}

genererProjects(works);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Filtres

// Tous les projets
const allTrier = document.querySelector("#allButton");

// Fonction qui sert à détecter le clique de l'utilisateur sur le bouton
allTrier.addEventListener("click", function() {
    // Effacement de l'écran et regénération de la page
    document.querySelector(".gallery").innerHTML = "";
    // Génère la liste des projets concernés par le filtre
    genererProjects(works)
});

// Filtre objets
const objectsTrier = document.querySelector("#objectsButton");

objectsTrier.addEventListener("click", function() {
    // Permet de filtrer les projets avec la condition en return (true/false)
    const objectsTried = works.filter(function(work) {
        return work.category.name === "Objets";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjects(objectsTried)
});

// Filtre appartements
const apartmentsTrier = document.querySelector("#apartmentsButton");

apartmentsTrier.addEventListener("click", function() {
    const apartmentsTried = works.filter(function(work) {
        return work.category.name === "Appartements";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjects(apartmentsTried)
});

// Filtre hôtels et restaurants
const livingTrier = document.querySelector("#livingsButton");

livingTrier.addEventListener("click", function() {
    const livingTried = works.filter(function(work) {
        return work.category.name === "Hotels & restaurants";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjects(livingTried)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////