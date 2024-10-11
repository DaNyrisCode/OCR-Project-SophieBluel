import { getCategoriesFromApi, getWorksFromApi } from "./api.js";
// Le fouteur de trouble
// import { displayMyProjects } from "./app.js"; 

const allWorks = await getWorksFromApi();
const categories = await getCategoriesFromApi();

const modifyBtn = document.querySelector('.edit-app span');
const modal = document.querySelector('#modal1');

modifyBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

document.querySelector('.modal').addEventListener('click', (e) => {
    if (!e.target.closest('.modal__content')) {
        modal.classList.remove('active');
    }
});
;
