const express = require('express');
const axios = require('axios');  
const Student = require('../Model/Student');

const router = express.Router();
const COURSE_SERVICE_URL = 'http://localhost:3000/api/courses';  

router.post('/enroll/:etudiant_id/:cours_id', async (req, res) => {
    try {
        const { etudiant_id, cours_id } = req.params;

        const student = await Student.findById(etudiant_id);
        if (!student) return res.status(404).json({ message: "Étudiant non trouvé" });

        const courseResponse = await axios.get(`${COURSE_SERVICE_URL}/${cours_id}`);
        if (courseResponse.status !== 200) return res.status(404).json({ message: "Cours non trouvé" });

        if (student.courses.includes(cours_id)) {
            return res.status(400).json({ message: "L'étudiant est déjà inscrit à ce cours" });
        }

        student.courses.push(cours_id);
        await student.save();

        res.json({ message: "Inscription réussie", student });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;
