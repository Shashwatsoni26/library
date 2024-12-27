const db = require('../db');

const BookModel = {
    // Get all books
    getAll: async () => {
        return db.query('SELECT * FROM book');
    },

    // Add a new book
    add: async ({ name, code, author }) => {
        return db.query('INSERT INTO book (name, code, author) VALUES (?, ?, ?)', [name, code, author]);
    },

    // Edit an existing book by its name
    edit: async (name, { code, author }) => {
        return db.query('UPDATE book SET code = ?, author = ? WHERE name = ?', [code, author, name]);
    },

    // Delete a book by its name
    delete: async (name) => {
        return db.query('DELETE FROM book WHERE name = ?', [name]);
    },
};

module.exports = BookModel;
