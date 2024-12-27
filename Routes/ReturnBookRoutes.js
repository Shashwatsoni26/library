const express = require('express');
const router = express.Router();
const ReturnBookController = require('../Controller/ReturnBookController');

// Route to render the form with students
router.get('/', ReturnBookController.renderForm);

// Route to fetch books issued to a specific student
router.get('/books/:studentName', ReturnBookController.fetchBooksForStudent);

// Route to handle book return
router.post('/return', ReturnBookController.returnBook);

module.exports = router;
