# 1. Lancer le serveur MongoDB
Dans un terminal, exécutez la commande suivante pour démarrer MongoDB :
.\bin\mongod.exe --dbpath data

# 2. Installer les dépendances
Depuis le répertoire pokedex/pokedex_back, installez les dépendances avec :
npm install

# 3. Démarrer le serveur backend
Toujours dans pokedex/pokedex_back, lancez le serveur avec :
nodemon

# 4. Peupler la base de données
Ouvrez un nouveau terminal en parallèle dans pokedex/pokedex_back et exécutez :
node script_peuplement.js

# 5. Lancer l'interface frontend
Ouvrez index.html situé dans pokedex_front avec votre navigateur web.