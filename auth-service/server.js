require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URL_MONGOOSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(' Connexion à MongoDB réussie !'))
.catch(err => console.error(' Erreur de connexion à MongoDB :', err));

const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur Auth en écoute sur le port ${PORT}`));
