const WebSocket = require('ws');
// const jwt = require('jsonwebtoken'); 

const wss = new WebSocket.Server({ port: 8181 });

console.log("Serveur WebSocket démarré sur le port 8181");

module.exports = wss;
