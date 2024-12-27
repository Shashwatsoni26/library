const db = require('../db'); // Replace with your database connection module

const IssueBookModel = {
    getAllStudents: async () => {
        try {
            const [rows] = await db.query('SELECT name, rollno FROM student'); // Include rollno
            return rows;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch students from the database.');
        }
    },

    getAllBooks: async () => {
        try {
            const [rows] = await db.query('SELECT name, code FROM book WHERE bookissued_status = 1'); // Include code
            return rows;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch books from the database.');
        }
    },

    updateIssueStatus: async (studentRollno, bookCode) => {
        let connection;
        try {
            connection = await db.getConnection();
            await connection.beginTransaction();
    
            // Update the book's status to 0 (issued)
            await connection.query(
                'UPDATE book SET bookissued_status = 0 WHERE code = ?',
                [bookCode]
            );
    
            // Insert into transaction table with the 'issue' type
            await connection.query(
                'INSERT INTO transaction (studentid, bookid, creationdate, type) VALUES (?, ?, ?, ?)',
                [studentRollno, bookCode, new Date(), 'issue']
            );
    
            // Commit the transaction
            await connection.commit();
            return { success: true };
        } catch (error) {
            console.error(error);
            if (connection) await connection.rollback();
            return { success: false, error: 'Database error occurred.' };
        } finally {
            if (connection) connection.release();
        }
    }
    
};

module.exports = IssueBookModel;
