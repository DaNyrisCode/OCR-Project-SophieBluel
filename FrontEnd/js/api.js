// PROJETCS ***
let allWorks = [];
// Récupération des Projets
const getWorksFromApi = async() => {
    const response = await fetch("http://localhost:5678/api/works");
    const worksJson = await response.json();
    allWorks = worksJson;
    displayMyProjects(worksJson);
}
getWorksFromApi();

// Injection HTML des Projets
const displayMyProjects = (works) => {
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

// CATEGORIES / FILTRES ***
// Récupération des Catégories
const getCategoriesFromApi = async() => {
    const response = await fetch("http://localhost:5678/api/categories");
    const categoriesJson = await response.json();
    injectFilters(categoriesJson);
};
getCategoriesFromApi();

// Injection des filtres
const injectFilters = (categories) => {
    const filterGroup = document.querySelector('.filter-group');

    // Bouton par defaut
    const allBtn = document.createElement('button');
    allBtn.classList.add('filter-btn', 'active');
    allBtn.textContent = 'Tous';
    allBtn.dataset.filter = 'all';
    filterGroup.appendChild(allBtn);

    // Boutons par Catégories
    categories.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.classList.add('filter-btn');
        filterBtn.textContent = category.name;
        filterBtn.dataset.filter = category.id;
        filterGroup.appendChild(filterBtn);
    });

    // Event listener des filtres
    filterGroup.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.toggle('active', btn === e.target)
            );

            const filter = e.target.dataset.filter;

            // Affiche tous les projets ou par categories
            const projectsToDisplay = filter === 'all' ? allWorks : allWorks.filter(work => work.categoryId == filter);
            displayMyProjects(projectsToDisplay);            
        }
    });
};

