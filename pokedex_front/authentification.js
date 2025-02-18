// Sélectionner les éléments
const loginButton = document.getElementById('loginButton');
const modal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const errorMessageDiv = document.getElementById('errorMessage');

// Afficher la fenêtre modale lorsque le bouton "Se connecter" est cliqué
loginButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Fermer la fenêtre modale lorsque l'utilisateur clique sur le bouton de fermeture (×)
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fermer la fenêtre modale lorsque l'utilisateur clique en dehors de la fenêtre modale
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Gestion du formulaire de connexion
loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche la soumission par défaut

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

        // Si la connexion est réussie, on peut stocker le token
        localStorage.setItem('authToken', data.token);

        // Message de succès
        alert('Connexion réussie !');

        // Fermer la modale
        modal.style.display = 'none';

        // Rediriger ou mettre à jour l'interface
        // window.location.href = '/dashboard'; // Exemple pour rediriger
    } catch (error) {
        // Afficher l'erreur dans la modale
        errorMessageDiv.textContent = error.message;
    }
});
