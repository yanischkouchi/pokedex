const WebSocket = require('ws');
const jwt = require('jsonwebtoken'); 

const wss = new WebSocket.Server({ port: 8181 });

// Fonction pour vérifier l'authentification via JWT
function authenticateClient(token) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET); // Assurez-vous de remplacer 'votre_clé_secrète' par la clé que vous utilisez pour signer vos JWT
        return decoded; // Retourne les informations de l'utilisateur si le token est valide
    } catch (err) {
        console.log("Erreur d'authentification:", err);
        return null; // Retourne null si le token est invalide
    }
}

wss.on('connection', function connection(client, req) {
    // Récupérer le token depuis l'URL ou un en-tête (ajustez selon votre usage)
    const token = req.headers['sec-websocket-protocol']; // Utilisation d'un en-tête personnalisé pour le token JWT

    const user = authenticateClient(token);

    if (!user) {
        client.close(); // Si l'authentification échoue, fermer la connexion
        console.log('Client non authentifié, connexion fermée');
        return;
    }

    console.log(`Utilisateur ${user.username} connecté`);

    client.on('message', function incoming(message) {
        console.log(`Message reçu de ${user.username}:`, message);

        // Diffuser le message à tous les clients connectés
        wss.clients.forEach((otherClient) => {
            if (otherClient !== client && otherClient.readyState === WebSocket.OPEN) {
                otherClient.send(`Message de ${user.username}: ${message}`);
            }
        });

        // Pour que l'expéditeur voit son message
        client.send(`Votre message: ${message}`);
    });

    client.send(`Bienvenu, ${user.username}, vous êtes authentifié !`);
});

console.log("Serveur WebSocket démarré sur le port 8181");

module.exports = wss;
