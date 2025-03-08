const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentRoutes = require('./routes/student');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Student Service en écoute sur le port ${PORT}`);
});
