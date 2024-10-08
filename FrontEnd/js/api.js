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
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const user = response.ok ? await response.json() : Promise.reject(`Erreur: ${response.status}`);
        return user;
    } catch (error) {
        console.error("Erreur lors de la tentative de connexion");
        return null;
    }
};

export {
    getCategoriesFromApi,
    getWorksFromApi,
    verifyLogin
}