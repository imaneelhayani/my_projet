const express = require('express');
const Teacher = require('../Model/Teacher');
const axios = require('axios'); 

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { name, email, subject } = req.body;
        const newTeacher = new Teacher({ name, email, subject });
        await newTeacher.save();
        res.status(201).json({ message: "Professeur ajouté avec succès", teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

router.post('/assign/:professeur_id/:cours_id', async (req, res) => {
    try {
        const { professeur_id, cours_id } = req.params;

        const teacher = await Teacher.findById(professeur_id);
        if (!teacher) return res.status(404).json({ message: "Professeur non trouvé" });

        const courseResponse = await axios.get(`http://localhost:3001/api/courses/${cours_id}`); // Assure-toi que le service de cours écoute sur ce port
        const course = courseResponse.data;

        if (!course) {
            return res.status(404).json({ message: "Cours non trouvé" });
        }

        if (course.teacher) {
            return res.status(400).json({ message: "Ce cours a déjà un professeur assigné" });
        }

        course.teacher = professeur_id;
        await axios.put(`http://localhost:3001/api/courses/${cours_id}`, course);  // Mise à jour du cours avec le professeur attribué

        res.json({ message: "Cours attribué au professeur avec succès", course });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

router.get('/enrolledStudents/:cours_id', async (req, res) => {
    try {
        const { cours_id } = req.params;

        const studentsResponse = await axios.get(`http://localhost:4000/api/students/enrolledStudents/${cours_id}`);
        const students = studentsResponse.data.students;

        res.json({ students });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

module.exports = router;
