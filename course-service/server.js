const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connecté à MongoDB"))
  .catch(err => console.error("Erreur de connexion", err));

const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Course Service en écoute sur le port ${PORT}`);
});
