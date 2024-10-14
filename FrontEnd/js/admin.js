import { getCategoriesFromApi, getWorksFromApi } from "./api.js";
import { displayMyProjects } from "./api.js";

const allWorks = await getWorksFromApi();
const categories = await getCategoriesFromApi();

const mainGallery = document.querySelector('.gallery');
displayMyProjects(allWorks, mainGallery);

// Gestion modale
const modifyBtn = document.querySelector('.edit-app span');
const modal1 = document.querySelector('#modal1');
const modal2 = document.querySelector('#modal2');
const closeModalBtns = document.querySelectorAll('.close-btn');
const addPhotoBtn = document.querySelector('.add-photo-btn');

// Fermeture - Ouverture Modale
const closeModal = (modal) => {
    modal.classList.remove('active');
};
const openModal = (modal) => {
    modal.classList.add('active');
};

// Ouverture Modale depuis le Btn modifier
if (modifyBtn) {
    modifyBtn.addEventListener('click', () => {
        openModal(modal1);

        const modalGallery = document.querySelector('.modal__gallery');displayMyProjects(allWorks, modalGallery);
    });
}

// Fermeture via Btn X
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal);
    });
});

// Fermeture via click en dehors
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal__content')) {
            closeModal(modal);
        }
    });
});

// Permut modale 1 => modale 2
if (addPhotoBtn) {
    addPhotoBtn.addEventListener('click', () => {
        closeModal(modal1);
        openModal(modal2);
    });
}