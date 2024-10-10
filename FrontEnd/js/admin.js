import { getCategoriesFromApi, getWorksFromApi } from "./api.js";

const allWorks = await getWorksFromApi();
const categories = await getCategoriesFromApi();

document.querySelector('.modal').addEventListener('click', (e) => {
    if (!e.target.closest('.modal__content')) {
        document.querySelector('.modal').classList.remove('active');
    }
});
