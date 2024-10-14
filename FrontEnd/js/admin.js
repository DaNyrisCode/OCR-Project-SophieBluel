import { getCategoriesFromApi, getWorksFromApi } from "./api.js";
import { displayMyProjects } from "./api.js";

const allWorks = await getWorksFromApi();
const categories = await getCategoriesFromApi();

const mainGallery = document.querySelector('.gallery');
displayMyProjects(allWorks, mainGallery);

// Gestion modale
const modifyBtn = document.querySelector('.edit-app span');
const modal = document.querySelector('#modal1');
const closeModalBtn = document.querySelector('.close-btn');

const closeModal = (modal) => {
    modal.classList.remove('active');
};

    // Ouverture Modale
    if (modifyBtn) {
        modifyBtn.addEventListener('click', () => {
            modal.classList.add('active');

            const modalGallery = document.querySelector('.modal__gallery');displayMyProjects(allWorks, modalGallery);
        });
    }

    // Fermeture via Btn
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            closeModal(modal);
        });
    }

    // Fermeture via click en dehors
    document.querySelector('.modal').addEventListener('click', (e) => {
        if (!e.target.closest('.modal__content')) {
            closeModal(modal);
        }
    });