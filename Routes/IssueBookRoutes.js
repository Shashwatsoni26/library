const express = require('express');
const router = express.Router();
const IssueBookController = require('../Controller/IssueBookController');

// Route to render the form with students and books
router.get('/', IssueBookController.renderForm);

// Route to handle book assignment
router.post('/assign', IssueBookController.assignBook);

module.exports = router;
