// Récupération des Projects
const getWorksFromApi = async () => {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const worksJson = response.ok ? await response.json() : Promise.reject(`Erreur: ${response.status}`);

        return worksJson;
    } catch (error) {
        console.error("Erreur de récupération des projets.");
    }
};

// Récupération des Catégories
const getCategoriesFromApi = async () => {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        const categoriesJson = response.ok ? await response.json() : Promise.reject(`Erreur: ${response.status}`);
        return categoriesJson;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories");
    }
};

// Vérification du compte
const verifyLogin = async (email, password) => {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    return response.ok ? await response.json() : Promise.reject(new Error(`Erreur ${response.status}: ${response.statusText}`));
};

// PROJETCS ***
// Injection HTML des Projets
const displayMyProjects = (works, container, filter = null) => {
    container.innerHTML = '';

    // Affiche les projets par defaut ou par catégorie
    const filteredWorks = filter === 'all' || !filter
        ? works
        : works.filter(work => work.categoryId == filter);

    filteredWorks.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        // MODALE 
        //Bouton corbeille 
        if (container.classList.contains('modal__gallery')) {
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerHTML = '<img src="./assets/icons/corbeille.png" alt="Suprimmer photo" />';
            figure.appendChild(deleteBtn);
        }

        figure.appendChild(img);
        figure.appendChild(figcaption);

        container.appendChild(figure);
    });
};

export {
    getCategoriesFromApi,
    getWorksFromApi,
    verifyLogin,
    displayMyProjects
}