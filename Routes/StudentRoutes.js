const express = require('express');
const router = express.Router();
const StudentController = require('../Controller/StudentController');

// Route to get all students
router.get('/', StudentController.getAll);

// Route to add a new student
router.post('/add', StudentController.addStudent);

// Route to edit a student by name
router.post('/edit/:name', StudentController.editStudent);

// Route to delete a student by name
router.post('/delete/:name', StudentController.deleteStudent);

module.exports = router;
