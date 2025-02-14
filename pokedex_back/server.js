const express = require('express');
const app = express();
const port = 3000;
const apiRouteur = require('./src/routes/api')
// const wss = require('./websocketserver')

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
app.use('/api', apiRouteur);
