import {
    getCategoriesFromApi,
    getWorksFromApi,
    displayMyProjects,
    deleteResourceFromApi,
    addProjectToApi
} from "./api.js";

// Redirection si l'utilisateur n'est pas connecté
if (!localStorage.getItem('token')) {
    window.location.href = './login.html';
    alert("Veuillez saisir vos identifiants");
}

let allWorks = await getWorksFromApi();
const categories = await getCategoriesFromApi();

const mainGallery = document.querySelector('.gallery');
const modifyBtn = document.querySelector('.edit-app span');

// Formulaire
const form = document.getElementById('addProject');
const imageInput = document.getElementById('new-project');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('categories-select');
const submitButton = document.querySelector('.submit-add-photo-btn');

// Gestion modale
const modal1 = document.querySelector('#modal1');
const modalGallery = modal1.querySelector('.modal__gallery');
const modal2 = document.querySelector('#modal2');
const closeModalBtns = document.querySelectorAll('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const addPhotoBtn = document.querySelector('.add-photo-btn');
const toHide = document.querySelector('#toHide');

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

// Reset du form & preview image
const resetFormAndPreview = () => {
    form.reset();
    togglePreview();
};

// Event listener sur les boutons delete
const deleteListener = () => {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.parentElement.dataset.projectId;
            deleteProject(projectId);
        });
    })
}

// COMPORTEMENT MODALE ***
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
    displayMyProjects(allWorks, modalGallery);
    deleteListener()
});

// Fermeture via Btn X
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        toggleModal(modal, false);
        resetFormAndPreview();
    });
});

// Fermeture via click en dehors
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal__content')) {
            toggleModal(modal, false);
            resetFormAndPreview();
        }
    });
});

// Permut modale 1 => modale 2
addPhotoBtn.addEventListener('click', () => {
    switchModal(modal1, modal2);
    injectCategoriesIntoSelect(categories);
    toHide.classList.remove('hidden');
});

// Permut modale 2 => modale 1
prevBtn.addEventListener('click', () => {
    switchModal(modal2, modal1);
    resetFormAndPreview();
})
// ***

// Suppression d'un projet
const deleteProject = async (projectId) => {
    const project = allWorks.find(work => work.id == projectId);

    // Appelle la suppression et passe l'ID et le titre
    const deletedProject = await deleteResourceFromApi('works', projectId, project?.title || 'Projet inconnu');
    if (deletedProject) {
        // Supprime le projet de la Modale et met à jour la liste allWorks
        allWorks = allWorks.filter(work => work.id != deletedProject.id);

        // Actualise la gallerie
        displayMyProjects(allWorks, mainGallery);
        displayMyProjects(allWorks, modalGallery);
        deleteListener()
    }
};

// UPLOAD IMAGE ***
// Prévisualisation de l'image du Nouveau Projet
const togglePreview = (url = "./assets/icons/add-img.png") => {
    const previewImage = document.querySelector('#previewImage');
    toHide.classList.toggle('hidden');
    previewImage.src = url;
};

// Event listener pour la sélection d'image
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const url = file ? URL.createObjectURL(file) : null;
    togglePreview(url);
});

// AJOUTS NEW PROJETS & VERIF CHAMPS ***
// Verif des champs 
const validateForm = () => {
    return titleInput.value.trim() !== '' && categorySelect.value !== '' && imageInput.files.length > 0;
};

// Ajouts de Nouveau Projets
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    const formData = new FormData(form);

    try {
        const data = await addProjectToApi(formData);

        // Mise à jour des projets
        allWorks.push(data);
        displayMyProjects(allWorks, mainGallery);
        displayMyProjects(allWorks, modalGallery);
        switchModal(modal2, modal1);
        deleteListener()

        alert(`Le projet "${data.title}" a été ajouté avec succès.`);
        resetFormAndPreview();
    } catch (error) {
        alert(error.message);
    }
});

// Gestion du Btn Valider
const checkButton = () => {
    validateForm() 
        ? submitButton.classList.remove('invalid') 
        : submitButton.classList.add('invalid');
};

// Event Listener pour la validation du formulaire
titleInput.addEventListener('input', checkButton);
categorySelect.addEventListener('change', checkButton);
imageInput.addEventListener('change', checkButton);


// INJECTS ***
displayMyProjects(allWorks, mainGallery);
deleteListener();
injectCategoriesIntoSelect(categories);