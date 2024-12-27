const BookModel = require('../Models/BookModel');

const BookController = {
    // Get all books
    getAllBooks: async (req, res) => {
        const [books] = await BookModel.getAll();
        res.render('Book', { title: 'My Books', books: books });
    },

    // Add a new book
    addBook: async (req, res) => {
        const { name, code, author } = req.body;
        await BookModel.add({ name, code, author });
        res.redirect('/books'); // Redirect back to the books page
    },

    // Edit a book by name
    editBook: async (req, res) => {
        const { name } = req.params;
        const { code, author } = req.body;
        await BookModel.edit(name, { code, author });
        res.redirect('/books'); // Redirect back to the books page
    },

    // Delete a book by name
    deleteBook: async (req, res) => {
        const { name } = req.params;
        await BookModel.delete(name);
        res.redirect('/books'); // Redirect back to the books page
    },
};

module.exports = BookController;
