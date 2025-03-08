const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const teacherRoutes = require('./routes/teacher');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));

app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Teacher Service en écoute sur le port ${PORT}`);
});
