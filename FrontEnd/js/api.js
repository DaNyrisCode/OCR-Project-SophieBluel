const getDataFromApi = async() => {
    const response = await fetch("http://localhost:5678/api/works");
    const json = await response.json();
    myProjects(json);
}
getDataFromApi();

// Récupération des Projets
const myProjects = (works) => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    // Boucle sur les travaux
    works.forEach(work => {
        const figure = document.createElement('figure');

        // Image
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        // Figcaption
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        
        figure.appendChild(img);
        figure.appendChild(figcaption);

        gallery.appendChild(figure);
    });
};