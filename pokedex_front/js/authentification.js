/* CONNEXION */

const loginButton = document.getElementById('loginButton');
const modal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const errorAuth = document.getElementById('errorAuth');

loginButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// fermer la fenêtre modale lorsque l'utilisateur clique en dehors
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // empêcher la soumission par défaut

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Email ou mot de passe incorrect');
        }

        const data = await response.json();

        localStorage.setItem('authToken', data.token);

        alert('Connexion réussie !');

        modal.style.display = 'none';

        // window.location.href = '/dashboard'; // exemple pour rediriger après connexion
    } catch (error) {
        errorAuth.textContent = error.message;
    }
});


/* INSCRIPTION */

const registerButton = document.getElementById('registerButton');
const registerModal = document.getElementById('registerModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const registerForm = document.getElementById('registerForm');
const errorRegister = document.getElementById('errorRegister');

// Ouvrir la modale d'inscription
registerButton.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

// Fermer la modale d'inscription
closeRegisterModal.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

// Fermer la modale en cliquant à l'extérieur
window.addEventListener('click', (event) => {
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Gestion du formulaire d'inscription
registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });

        if (!response.ok) {
            throw new Error('Inscription échouée. Vérifiez vos informations.');
        }

        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        registerModal.style.display = 'none';

    } catch (error) {
        errorRegister.textContent = error.message;
    }
});
