const express = require('express');
const app = express();
const port = 3000;
const apiRouteur = require('./src/routes/pkmn')
const userRouteur = require('./src/routes/user')
const authRouteur = require('./src/routes/auth')
const trainerRouteur = require('./src/routes/trainer')
require('dotenv').config({ path: 'props.env' });
const wss = require('./websocketserver')
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connexion à l'API
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/data')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
app.use(cors());
app.use('/api', apiRouteur, userRouteur, authRouteur, trainerRouteur);
