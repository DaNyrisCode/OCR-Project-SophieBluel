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

            deleteBtn.dataset.projectId = work.id;

            figure.appendChild(deleteBtn);
        }

        figure.appendChild(img);
        figure.appendChild(figcaption);

        container.appendChild(figure);
    });
};

// API ***
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

// Suppression d'un projet
const deleteResourceFromApi = async (resource, id, title) => {
    try {
        const response = await fetch(`http://localhost:5678/api/${resource}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur : ${response.status}`);
        }

        alert(`Le projet "${title}" a été supprimé avec succès.`);


        return { id, title };
    } catch (error) {
        console.error(`Erreur lors de la suppression : ${error.message}`);
        return null;
    }
};

// Ajout d'un projet
const addProjectToApi = async (formData) => {
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de l'ajout du projet : ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Erreur lors de l'ajout du projet : ${error.message}`);
        return null;
    }
};

// EXPORTS ***
export {
    getCategoriesFromApi,
    getWorksFromApi,
    verifyLogin,
    displayMyProjects,
    deleteResourceFromApi,
    addProjectToApi
};
