const express = require('express');
const router = express.Router();
const BookController = require('../Controller/BookController');

// Route to get all books
router.get('/', BookController.getAllBooks);

// Route to add a new book
router.post('/add', BookController.addBook);

// Route to edit a book by its name
router.post('/edit/:name', BookController.editBook);

// Route to delete a book by its name
router.post('/delete/:name', BookController.deleteBook);

module.exports = router;
