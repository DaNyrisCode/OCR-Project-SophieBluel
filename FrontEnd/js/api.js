// Récupération des Projets
const getDataFromApi = async() => {
    const response = await fetch("http://localhost:5678/api/works");
    const worksJson = await response.json();
    myProjects(worksJson);
}
getDataFromApi();

// Injection HTML des Projets
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

// Récupération des Catégories
const getCategoriesFromApi = async() => {
    const response = await fetch("http://localhost:5678/api/categories");
    const categoriesJson = await response.json();
    filters(categoriesJson);
}

// Injection des filtres
const filters = (categories) => {
    const filterGroup = document.querySelector('.filter-group');

    // Bouton par defaut
    const allBtn = document.createElement('button');
    allBtn.classList.add('filter-btn', 'active');
    allBtn.textContent = 'Tous';
    filterGroup.appendChild(allBtn);

    // Boutons par Catégories
    categories.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.classList.add('filter-btn');
        filterBtn.textContent = category.name;
        filterGroup.appendChild(filterBtn);
    });
}
getCategoriesFromApi();

