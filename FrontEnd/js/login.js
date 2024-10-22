import { verifyLogin } from "./api.js";

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("#email").value;
    const password = loginForm.querySelector("#password").value;

    try {
        const user = await verifyLogin(email, password);

        if (user && user.token) {
            localStorage.setItem("token", user.token);           
            window.location.href = "./admin.html";
        }
    } catch (error) {
        console.error("Erreur lors de la tentative de connexion :", error.message);
    }
});
