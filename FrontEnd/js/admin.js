import { 
    getCategoriesFromApi, 
    getWorksFromApi, 
    displayMyProjects, 
    deleteResourceFromApi,
    addProjectToApi 
} from "./api.js";

let allWorks = await getWorksFromApi();
const categories = await getCategoriesFromApi();

const mainGallery = document.querySelector('.gallery');
const modifyBtn = document.querySelector('.edit-app span');

// Formulaire
const form = document.getElementById('addProject');
const imageInput = document.getElementById('new-project');
const fileUploadContainer = document.querySelector('.file-upload-container');
const submitButton = document.querySelector('submit-add-photo-btn')

// Gestion modale
const modal1 = document.querySelector('#modal1');
const modalGallery = modal1.querySelector('.modal__gallery');
const modal2 = document.querySelector('#modal2');
const closeModalBtns = document.querySelectorAll('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const addPhotoBtn = document.querySelector('.add-photo-btn');

// Event listener sur les boutons delete
const deleteListener = () => {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.parentElement.dataset.projectId;
            deleteProject(projectId);
        });
    })
}

// Injection HTML des Projets
displayMyProjects(allWorks, mainGallery);
deleteListener()

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
        allWorks = allWorks.filter(work => work.id != deletedProject.id);

        // Actualise la gallerie
        displayMyProjects(allWorks, mainGallery);
        displayMyProjects(allWorks, modalGallery);
        deleteListener()
    }
};

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

/* Prévisualisation de l'image
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    

    if (file) {
        // Remplace le contenu de l'input File
        fileUploadContainer.innerHTML = `
            <img src="${url}" alt="Aperçu de l'image" class="uploaded-image" />
        `;
    }
}); */

// Verif des champs 
const validateForm = () => {
    const title = document.getElementById('title').value;
    const category = document.getElementById('categories-select').value;
    const imageInput = document.getElementById('new-project');

    return title !== '' && category !== '' && imageInput.files.length > 0;
};

// Gestion de la soumission du formulaire
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        // submitButton.classList.add('invalid');
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

        alert(`Le projet "${data.title}" a été ajouté avec succès.`);

        form.reset();
    } catch (error) {
        alert(error.message);
    }
});


