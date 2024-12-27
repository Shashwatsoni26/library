const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');//called view/index.ejs
});
router.use('/students', require('./StudentRoutes'));
router.use('/books', require('./BookRoutes'));
router.use('/issuebook', require('./IssueBookRoutes'));
router.use('/returnbook', require('./ReturnBookRoutes'));
router.use('/reports', require('./ReportRoutes'));

module.exports = router;
