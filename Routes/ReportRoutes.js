const express = require('express');
const router = express.Router();
const ReportController = require('../Controller/ReportController');

// Route to display filtered data
router.get('/', ReportController.getFilteredData);

module.exports = router;
