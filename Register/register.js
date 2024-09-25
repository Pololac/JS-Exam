const registerForm = document.querySelector("#register-form");
const errorDiv = document.querySelector("#error");
const successDiv = document.querySelector("#success");
const spinner = document.querySelector("#loading-spinner");
const registerButton = registerForm.querySelector('button[type="submit"]');


registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    errorDiv.classList.add("hidden");
    successDiv.classList.add("hidden");
    spinner.classList.remove("hidden");
    registerButton.disabled = true;
  
    const formData = new FormData(registerForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmationPassword = formData.get("passwordConfirm");
    
    // Afin d'éviter d'enregistrer dans BDD des identifiants qui ne respectent pas les critères
    if (password.length >= 8 && password === confirmationPassword) {
        try {
            const res = await fetch("http://localhost:8000/api/users", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({email, password})
            })

            // console.log(res.status);

            if (!res.ok) {
                errorDiv.innerText = "Erreur survenue lors de l'authentification";
                errorDiv.classList.remove("hidden");
                spinner.classList.add("hidden");
                registerButton.disabled = false;
                console.error("Erreur survenue lors de l'authentification", res.status);
                return;
            }

            if (res.status === 201) {
                successDiv.classList.remove("hidden");
                successDiv.innerText = "Inscription validée";
                spinner.classList.add("hidden");
                registerButton.disabled = false;
                return;
            }

            const data = await res.json();      // Pas utilisé là, mais pourrait permettre de charger une page utilisateur par exemple.


        } catch (err) {
            console.error("Erreur CATCH: ", err);
        }

    } else if (password.length < 8) {
        errorDiv.innerText = "Le mot de passe doit faire au moins 8 caractères";
        errorDiv.classList.remove("hidden");
        spinner.classList.add("hidden");
        registerButton.disabled = false;
        return;

    } else if (password !== confirmationPassword) {
        errorDiv.innerText = "Les mots de passe ne sont pas identiques";
        errorDiv.classList.remove("hidden");
        spinner.classList.add("hidden");
        registerButton.disabled = false;
        return;
    }

});