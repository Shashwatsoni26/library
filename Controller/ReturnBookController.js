const ReturnBookModel = require('../Models/ReturnBookModel');

const ReturnBookController = {
    renderForm: async (req, res) => {
        try {
            // Fetch students with issued books
            const students = await ReturnBookModel.getAllStudentsWithBookIssued();

            // Render the HTML form with fetched students
            res.render('ReturnBook', { students });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to fetch data for the return form.' });
        }
    },

    fetchBooksForStudent: async (req, res) => {
        try {
            const studentName = req.params.studentName;
            
            // Fetch books issued to the selected student
            const books = await ReturnBookModel.getBooksByStudent(studentName);
            
            if (books.length > 0) {
                res.status(200).json({ success: true, books });
            } else {
                res.status(404).json({ success: false, message: 'No books found for this student.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to fetch books for the student.' });
        }
    },

    returnBook: async (req, res) => {
        try {
            const { student, book } = req.body;

            // Call model method to update the book and student statuses
            const result = await ReturnBookModel.updateReturnStatus(student, book);

            if (result.success) {
                res.redirect('/returnbook'); // Redirect to the return book page
            } else {
                res.status(400).send({ message: result.error }); // Send error response
            }
        } catch (error) {
            console.error(error);
            res.redirect('/returnbook'); // Redirect to the return book page on error
        }
    }
};

module.exports = ReturnBookController;
