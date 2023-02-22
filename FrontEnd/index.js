////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Connexion & utilitaires administrateur

// Vérifie si l'utilisateur est connecté ou non et ajuste la page comme tel
if (window.sessionStorage.getItem('token')) {
    const headBar = document.getElementById('loggedBand');
    headBar.style.display = 'flex';

    const logout = document.getElementById('navOn');
    const login = document.getElementById('navOff');
    login.style.display = 'none';
    logout.style.display = 'block';

    const editBtn1 = document.getElementById('loggedEdit1');
    editBtn1.style.display = 'block';
    const editBtn2 = document.getElementById('loggedEdit2');
    editBtn2.style.display = 'block';
    const editBtn3 = document.getElementById('loggedEdit3');
    editBtn3.style.display = 'block';
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

// Fenêtre modale

function genererExistingProjects() {
    for (let i = 0; i < works.length; i++) {
        // Le parent où sera stocker les objets de la database
        const gallery = document.querySelector("#editableGallery");
        // Crée la box parent de la vignette
        const divElement = document.createElement("div");
        divElement.style.maxHeight = "110px";
        divElement.style.maxWidth = "15%";
        divElement.style.marginBottom = "25px";

        // Crée la box image de la vignette
        const imgElement = document.createElement("img");
        imgElement.src = works[i].imageUrl;
        imgElement.style.height = "100%";
        imgElement.style.width = "100%";

        // Crée le bouton d'édition de la vignette
        const buttonElement = document.createElement("button");
        buttonElement.style.border = "none";
        buttonElement.style.backgroundColor = "rgba(0,0,0,0)";
        buttonElement.style.fontFamily = "Work Sans";
        buttonElement.innerHTML = "éditer";
        buttonElement.addEventListener("mouseover", function(event) {
            event.target.style.cursor = "pointer"
        });
        buttonElement.addEventListener("click", function(event) {
            console.log("La requête a bien été reçue !")
        });

        // Associe la box parent à la classe gallery en tant qu'enfant
        gallery.appendChild(divElement);
        // Associe l'image de la vignette à sa box parent
        divElement.appendChild(imgElement);
        divElement.appendChild(buttonElement)
    };
}

// Fonction pour ouvrir la fenêtre modale
const background = document.getElementById('modal');
document.getElementById('loggedEdit3').onclick = function() {
    background.style.display = 'flex';
    genererExistingProjects()
};

// Fonctions pour fermer la fenêtre modale

// En cliquant en dehors de la fenêtre
window.onclick = function(e) {
    if (e.target == modal) {
        background.style.display = 'none';
        document.querySelector("#editableGallery").innerHTML = ""
    }
};
// En cliquant sur la croix
document.getElementById('closeBtn1').onclick = function() {
    background.style.display = 'none';
    document.querySelector("#editableGallery").innerHTML = ""
};
document.getElementById('closeBtn2').onclick = function() {
    background.style.display = 'none';
    document.querySelector("#editableGallery").innerHTML = ""
};

//
const modalWindow1 = document.querySelector('#modalWindow1');
const modalWindow2 = document.querySelector('#modalWindow2');

//
document.getElementById('add-pictures').onclick = function() {
    modalWindow1.style.display = 'none';
    modalWindow2.style.display = 'flex'
};

//
document.getElementById('returnBack').onclick = function() {
    modalWindow2.style.display = 'none';
    modalWindow1.style.display = 'flex'
};

//
const getCategories = await fetch("http://localhost:5678/api/categories");
const categories = await getCategories.json();

categories.forEach(function(element) {
    const parentElement = document.querySelector('#categoriesContainer');

    const optionElement = document.createElement('option');
    optionElement.innerHTML = element.name;
    optionElement.value = element.name;

    parentElement.appendChild(optionElement)
});
    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////