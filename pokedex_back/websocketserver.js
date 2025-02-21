const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8181 });

console.log("Serveur WebSocket démarré sur le port 8181");

module.exports = wss;
