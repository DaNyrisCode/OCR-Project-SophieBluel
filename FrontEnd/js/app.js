import { getCategoriesFromApi, getWorksFromApi, displayMyProjects } from "./api.js";

let allWorks = await getWorksFromApi();
const categories = await getCategoriesFromApi();

const mainGallery = document.querySelector('.gallery');
displayMyProjects(allWorks, mainGallery);

// FILTRES ***
// Injection des filtres
const injectFilters = (categories) => {
    const filterGroup = document.querySelector('.filter-group');

    // Bouton par Defaut
    const allBtn = document.createElement('button');
    allBtn.classList.add('filter-btn', 'active');
    allBtn.textContent = 'Tous';
    allBtn.dataset.filter = 'all';
    filterGroup.appendChild(allBtn);

    // Boutons par Catégorie
    categories.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.classList.add('filter-btn');
        filterBtn.textContent = category.name;
        filterBtn.dataset.filter = category.id;
        filterGroup.appendChild(filterBtn);
    });

    // Event listener des Filtres
    filterGroup.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn =>
                btn.classList.toggle('active', btn === e.target)
            );

            const filter = e.target.dataset.filter;

            // Affiche les projets filtrés
            displayMyProjects(allWorks, mainGallery, filter);
        }
    });
};

// INJECTS ***
injectFilters(categories);
