const express = require("express");
const router = express.Router();
const Course = require("../Model/Course");
const { verifyToken } = require("../Middleware/verifyToken");

router.get("/all", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

router.post("/add", verifyToken, async (req, res) => {
    try {
        const { id, titre, professeur_id, description, prix } = req.body;
        const newCourse = new Course({ id, titre, professeur_id, description, prix });
        await newCourse.save();
        res.status(201).json({ message: "Cours ajouté avec succès", newCourse });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

router.put("/update/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = await Course.findOneAndUpdate({ id }, req.body, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: "Cours non trouvé" });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await Course.findOneAndDelete({ id });
        if (!deletedCourse) return res.status(404).json({ message: "Cours non trouvé" });
        res.json({ message: "Cours supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

router.get("/search", async (req, res) => {
    try {
        const { keyword } = req.query;
        const courses = await Course.find({ titre: new RegExp(keyword, "i") });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

module.exports = router;
