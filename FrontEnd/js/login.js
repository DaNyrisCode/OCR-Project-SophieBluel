import { verifyLogin } from "./api.js";

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("#email").value;
    const password = loginForm.querySelector("#password").value;

    const user = await verifyLogin(email, password);

    user && user.token 
        ? (localStorage.setItem("token", user.token), window.location.href = "./admin.html")
        : console.error("Échec de la connexion. Informations d'identification incorrectes, ou Utilisateur iconnu.");
});
