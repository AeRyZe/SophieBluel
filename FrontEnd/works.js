////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Récupère les travaux depuis l'API et les traduits en JSON
const getWorks = await fetch("http://localhost:5678/api/works");
const works = await getWorks.json();

for (let i = 0; i < works.length; i++) {
    // Index du projet actuel à chaque boucle
    const project = works[i];
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
    figureElement.appendChild(textElement);

    console.log(project.category.name)
};