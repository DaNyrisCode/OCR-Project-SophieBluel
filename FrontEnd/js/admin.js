import { getCategoriesFromApi, getWorksFromApi, displayMyProjects, deleteResourceFromApi } from "./api.js";

let allWorks = await getWorksFromApi();
const categories = await getCategoriesFromApi();

const mainGallery = document.querySelector('.gallery');

// Injection HTML des Projets
displayMyProjects(allWorks, mainGallery);


// Gestion modale
const modifyBtn = document.querySelector('.edit-app span');
const modal1 = document.querySelector('#modal1');
const modal2 = document.querySelector('#modal2');
const closeModalBtns = document.querySelectorAll('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const addPhotoBtn = document.querySelector('.add-photo-btn');


// Ouverture Modale - Fermeture Modale
const toggleModal = (modal, show) => {
    modal.classList.toggle('active', show);
};

// Switch entre 2 Modales
const switchModal = (currentModal, nextModal) => {
    currentModal.classList.remove('active');
    nextModal.classList.add('active');
};


// Ouverture Modale depuis le Btn modifier
modifyBtn.addEventListener('click', () => {
    toggleModal(modal1, true);

    const modalGallery = modal1.querySelector('.modal__gallery');
    displayMyProjects(allWorks, modalGallery);
});

// Fermeture via Btn X
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        toggleModal(modal, false);
    });
});

// Fermeture via click en dehors
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal__content')) toggleModal(modal, false);
    });
});

// Permut modale 1 => modale 2
addPhotoBtn.addEventListener('click', () => {
    switchModal(modal1, modal2);
    injectCategoriesIntoSelect(categories);
});

// Permut modale 2 => modale 1
prevBtn.addEventListener('click', () => {
    switchModal(modal2, modal1);
})

// Suppression d'un projet
const deleteProject = async (projectId) => {
    const project = allWorks.find(work => work.id == projectId);

    // Appelle la suppression et passe l'ID et le titre
    const deletedProject = await deleteResourceFromApi('works', projectId, project?.title || 'Projet inconnu');

    if (deletedProject) {
        // Supprime le projet de la Modale et met à jour la liste allWorks
        document.querySelector(`button[data-project-id="${deletedProject.id}"]`).closest('figure').remove();
        allWorks = allWorks.filter(work => work.id != deletedProject.id);

        // Actualise la gallerie
        displayMyProjects(allWorks, mainGallery);
    }
};

// Event listener sur les boutons delete
document.addEventListener('click', (e) => {
    const projectId = e.target.closest('.delete-btn').dataset.projectId;
    deleteProject(projectId);
});

// Injection des catégories dans le select
const injectCategoriesIntoSelect = (categories) => {
    const selectElement = document.getElementById('categories-select');
    selectElement.innerHTML = '';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        selectElement.appendChild(option);
    });
};
