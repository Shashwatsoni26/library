const IssueBookModel = require('../Models/IssueBookModel');

const IssueBookController = {
    renderForm: async (req, res) => {
        try {
            // Fetch student and book names from the database
            const students = await IssueBookModel.getAllStudents();
            const books = await IssueBookModel.getAllBooks();
    
            // Fetch error or success messages from query parameters
            const error = req.query.error || null;
            const success = req.query.success || null;
    
            // Render the HTML form with fetched data and messages
            res.render('IssueBook', { students, books, error, success });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to fetch data for the form.' });
        }
    },
    

    assignBook: async (req, res) => {
        try {
            const { student, book } = req.body;
    
            // Call model method to update the book and student statuses
            const result = await IssueBookModel.updateIssueStatus(student, book);
    
            if (result.success) {
                // Redirect back to the form with a success message
                res.redirect('/issuebook'); 
            } else {
                // Redirect back to the form with an error message
                res.redirect(`/issuebook?error=${encodeURIComponent(result.error)}`);
            }
        } catch (error) {
            console.error(error);
            // Redirect back with a general error message
            res.redirect('/issuebook?error=An+unexpected+error+occurred');
        }
    }
    
};

module.exports = IssueBookController;
