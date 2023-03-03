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
    // Effacement de l'écran et regénération de la page
    document.querySelector(".gallery").innerHTML = "";

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
    genererProjects(objectsTried)
});

// Filtre appartements
const apartmentsTrier = document.querySelector("#apartmentsButton");

apartmentsTrier.addEventListener("click", function() {
    const apartmentsTried = works.filter(function(work) {
        return work.category.name === "Appartements";
    });
    genererProjects(apartmentsTried)
});

// Filtre hôtels et restaurants
const livingTrier = document.querySelector("#livingsButton");

livingTrier.addEventListener("click", function() {
    const livingTried = works.filter(function(work) {
        return work.category.name === "Hotels & restaurants";
    });
    genererProjects(livingTried)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fenêtre modale

function genererExistingProjects() {
    // Le parent où sera stocker les objets de la database
    const gallery = document.querySelector("#editableGallery");

    gallery.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        // Crée la box parent de la vignette
        const divElement = document.createElement("div");
        divElement.setAttribute("id", "workContainer");

        // Crée la box image de la vignette
        const imgElement = document.createElement("img");
        imgElement.src = works[i].imageUrl;
        imgElement.setAttribute("id", "workImg");

        const deleteElement = document.createElement("button");
        deleteElement.innerHTML = '<i class="fa-solid fa-trash-can fa-xs"></i>';
        deleteElement.setAttribute("id", "deleteBtn");
        // Fonction qui permet de supprimer un projet ciblé
        deleteElement.addEventListener('click', function() {
            fetch(`http://localhost:5678/api/works/${works[i].id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.token}`,
                },
            })
            .then(response => { 
                if (response.ok) { 
                    alert("Projet supprimé avec succès !");
                    genererProjects(works);
                    genererExistingProjects()
                }
            });
        });

        // Crée le bouton d'édition de la vignette
        const buttonElement = document.createElement("button");
        buttonElement.innerHTML = "éditer";
        buttonElement.setAttribute("id", "editWork");
        buttonElement.addEventListener("click", function(event) {
            console.log("La requête a bien été reçue !")
        });

        // Associe la box parent à la classe gallery en tant qu'enfant
        gallery.appendChild(divElement);
        // Associe l'image de la vignette à sa box parent
        divElement.appendChild(imgElement);
        divElement.appendChild(deleteElement);
        divElement.appendChild(buttonElement)
    };
};

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

const modalWindow1 = document.querySelector('#modalWindow1');
const modalWindow2 = document.querySelector('#modalWindow2');

// Bouton d'ajout de photo de la modale
document.getElementById('add-pictures').onclick = function() {
    modalWindow1.style.display = 'none';
    modalWindow2.style.display = 'flex'
};

// Bouton de retour de la modale d'ajout
document.getElementById('returnBack').onclick = function() {
    modalWindow2.style.display = 'none';
    modalWindow1.style.display = 'flex';

    document.getElementById("uploadPict").value = "";
    document.querySelector("#formDiv input").value = "";

    document.querySelector('#pictureDiv').style.display = 'flex';
    document.querySelector('#previewDiv').style.display = 'none'
};

// Génère dynamiquement les catégories depuis l'API
const getCategories = await fetch("http://localhost:5678/api/categories");
const categories = await getCategories.json();

categories.forEach(function(element) {
    const parentElement = document.querySelector('#categoriesContainer');

    const optionElement = document.createElement('option');
    optionElement.innerHTML = element.name;
    optionElement.value = `${element.id},${element.name}`;

    parentElement.appendChild(optionElement)
});

// Permet à un bouton customisé de prendre la fonction d'un input file
document.querySelector('#addNewPict').onclick = function() {
    document.getElementById('uploadPict').click();
};

// Affiche l'image choisie par l'utilisateur
document.getElementById('uploadPict').onchange = function(event) {
    let target = event.target;
    let files = target.files;
    
    let fr = new FileReader();
    fr.onload = function() {
        document.getElementById('previewImg').src = fr.result;
    }
    fr.readAsDataURL(files[0]);

    // Change l'entrée actuelle du nom au nom du fichier
    const filename = document.getElementById('uploadPict').files[0].name.split('.')
    document.querySelector("#formDiv input").value = filename[0];

    // Affiche la seconde modale
    document.querySelector('#pictureDiv').style.display = 'none';
    document.querySelector('#previewDiv').style.display = 'flex'
};

// Valide le formulaire d'ajout et crée donc une nouvelle instance dans la database
document.querySelector('#addNewPictValidate').onclick = function() {
    const title = document.querySelector('#formDiv input').value;
    const image = document.querySelector('#uploadPict').files[0];
    const categoryElements = document.querySelector('#categoriesContainer').value.split(',');
    const categoryId = parseInt(categoryElements[0]);
    const categoryName = categoryElements[1];

    const formData = new FormData();

    formData.append('title', title);
    formData.append('image', image);
    formData.append('category', categoryId);
    
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${window.sessionStorage.token}`,
        },
        body: formData,
    })
    .then(function(response) {
        if (response.ok) {
            alert('Nouveau projet envoyé avec succès !');
            genererProjects(works);
            genererExistingProjects()
        } else {
            alert('Erreur lors de la lecture des informations.')
        }
    })
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////