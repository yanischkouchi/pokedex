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
