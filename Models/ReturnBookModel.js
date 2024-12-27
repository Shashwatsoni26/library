const db = require('../db'); // Replace with your database connection module

const ReturnBookModel = {
    getAllStudentsWithBookIssued: async () => {
        try {
            const [rows] = await db.query(
                `SELECT DISTINCT s.name 
                 FROM student s
                 JOIN transaction t ON s.rollno = t.studentid
                 WHERE t.type = 'issue'` // Added condition for type='issue'
            );
            return rows;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch students with issued books from the database.');
        }
    },

    getBooksByStudent: async (studentName) => {
        try {
            const [rows] = await db.query(
                `SELECT DISTINCT b.name
                 FROM book b
                 JOIN transaction t ON b.code = t.bookid
                 JOIN student s ON s.rollno = t.studentid
                 WHERE s.name = ? AND t.type = 'issue' AND b.bookissued_status = 0`, // Condition for bookissued_status = 0
                [studentName]
            );
            return rows;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch distinct book names for the selected student.');
        }
    },
    
    

    updateReturnStatus: async (studentName, bookName) => {
        let connection;
        try {
            connection = await db.getConnection();
            await connection.beginTransaction();
    
            // Get the student roll number and book code
            const [studentResult] = await connection.query(
                `SELECT rollno FROM student WHERE name = ?`,
                [studentName]
            );
            const [bookResult] = await connection.query(
                `SELECT code FROM book WHERE name = ?`,
                [bookName]
            );
    
            if (studentResult.length === 0 || bookResult.length === 0) {
                throw new Error('Student or Book not found.');
            }
    
            const studentRollno = studentResult[0].rollno;
            const bookCode = bookResult[0].code;
    
            // Insert the return transaction into the transaction table
            await connection.query(
                `INSERT INTO transaction (studentid, bookid, creationdate, type)
                 VALUES (?, ?, ?, ?)`,
                [studentRollno, bookCode, new Date(), 'return']
            );
    
            // Update the bookissue_status in the book table to 1
            await connection.query(
                `UPDATE book 
                 SET bookissued_status = 1 
                 WHERE code = ?`,
                [bookCode]
            );
    
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

module.exports = ReturnBookModel;
